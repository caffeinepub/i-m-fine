import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePlaybookAuth } from '../hooks/usePlaybookAuth';
import { usePlaybookWorkspace } from '../hooks/usePlaybookWorkspace';
import { useListProductSuggestions } from '../hooks/useProductSuggestions';
import GreenButton from '../components/GreenButton';
import { 
  Lock, 
  Upload, 
  Calendar, 
  Video, 
  Key, 
  FileText, 
  Trash2, 
  Edit, 
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Lightbulb,
} from 'lucide-react';
import { CourseInput } from '../components/playbook/course-builder/courseBuilderTypes';
import { validateCourseDuration } from '../components/playbook/course-builder/durationValidation';
import { generateCourseSynopsis } from '../components/playbook/course-builder/courseSynopsis';
import { generateCourseFiles, textToPdfBytes } from '../components/playbook/course-builder/pdfGenerator';
import { ExternalBlob } from '../backend';

export default function ProgramDirectorPlaybookPage() {
  const { isAuthenticated, isValidating, token, login, logout } = usePlaybookAuth();
  const workspace = usePlaybookWorkspace(token);
  const { data: suggestions, isLoading: suggestionsLoading } = useListProductSuggestions();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState('');

  // PDF upload state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfName, setPdfName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Event form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [editingEventId, setEditingEventId] = useState<bigint | null>(null);

  // Meeting link state
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingUrl, setMeetingUrl] = useState('');

  // Course builder state
  const [courseInput, setCourseInput] = useState<CourseInput>({
    courseName: '',
    duration: '',
    audience: '',
    goals: '',
    modules: [''],
  });
  const [showSynopsis, setShowSynopsis] = useState(false);
  const [courseSynopsis, setCourseSynopsis] = useState<any>(null);
  const [durationError, setDurationError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setLoginError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordChangeError('');
    setPasswordChangeSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordChangeError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordChangeError('Password must be at least 8 characters long.');
      return;
    }

    try {
      await workspace.changePassword.mutateAsync(newPassword);
      setPasswordChangeSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordChangeSuccess(false), 3000);
    } catch (error) {
      setPasswordChangeError('Failed to change password. Please try again.');
    }
  };

  const handlePdfUpload = async () => {
    if (!pdfFile || !pdfName) return;

    try {
      await workspace.uploadPdf.mutateAsync({ name: pdfName, file: pdfFile });
      setUploadSuccess(true);
      setPdfFile(null);
      setPdfName('');
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error('PDF upload error:', error);
    }
  };

  const handleCreateOrEditEvent = async () => {
    if (!eventTitle || !eventStartTime || !eventEndTime) return;

    const startTime = BigInt(new Date(eventStartTime).getTime() * 1000000);
    const endTime = BigInt(new Date(eventEndTime).getTime() * 1000000);

    try {
      if (editingEventId) {
        await workspace.editEvent.mutateAsync({
          id: editingEventId,
          title: eventTitle,
          description: eventDescription,
          startTime,
          endTime,
          location: eventLocation,
        });
        setEditingEventId(null);
      } else {
        await workspace.createEvent.mutateAsync({
          title: eventTitle,
          description: eventDescription,
          startTime,
          endTime,
          location: eventLocation,
        });
      }
      
      // Clear form
      setEventTitle('');
      setEventDescription('');
      setEventStartTime('');
      setEventEndTime('');
      setEventLocation('');
    } catch (error) {
      console.error('Event operation error:', error);
    }
  };

  const handleEditEvent = (event: any) => {
    setEditingEventId(event.id);
    setEventTitle(event.title);
    setEventDescription(event.description);
    setEventStartTime(new Date(Number(event.startTime) / 1000000).toISOString().slice(0, 16));
    setEventEndTime(new Date(Number(event.endTime) / 1000000).toISOString().slice(0, 16));
    setEventLocation(event.location);
  };

  const handleAddMeetingLink = async () => {
    if (!meetingTitle || !meetingUrl) return;

    try {
      await workspace.addMeetingLink.mutateAsync({ title: meetingTitle, url: meetingUrl });
      setMeetingTitle('');
      setMeetingUrl('');
    } catch (error) {
      console.error('Meeting link error:', error);
    }
  };

  const handleAddModule = () => {
    setCourseInput(prev => ({
      ...prev,
      modules: [...prev.modules, ''],
    }));
  };

  const handleRemoveModule = (index: number) => {
    setCourseInput(prev => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }));
  };

  const handleModuleChange = (index: number, value: string) => {
    setCourseInput(prev => ({
      ...prev,
      modules: prev.modules.map((m, i) => i === index ? value : m),
    }));
  };

  const handleGenerateSynopsis = () => {
    setDurationError('');
    
    // Validate duration
    const validation = validateCourseDuration(courseInput.duration);
    if (!validation.isValid) {
      setDurationError(validation.error || 'Invalid duration');
      return;
    }

    // Generate synopsis
    const synopsis = generateCourseSynopsis(courseInput);
    setCourseSynopsis(synopsis);
    setShowSynopsis(true);
  };

  const handleGenerateCourse = async () => {
    if (!courseSynopsis || !token) return;

    setIsGenerating(true);
    setGenerationSuccess(false);

    try {
      // Generate all course files
      const files = generateCourseFiles(courseSynopsis, courseInput);
      
      // Upload each file with course folder prefix
      for (const file of files) {
        const pdfBytes = textToPdfBytes(file.content);
        // Type assertion to work around TypeScript's strict ArrayBuffer checking
        const typedBytes = pdfBytes as Uint8Array<ArrayBuffer>;
        const blob = ExternalBlob.fromBytes(typedBytes);
        const fileName = `${courseInput.courseName}/${file.fileName}`;
        
        // Create a proper File object from the bytes using Array.from to ensure compatibility
        const byteArray = Array.from(pdfBytes);
        const fileBlob = new Blob([new Uint8Array(byteArray)], { type: 'text/plain' });
        const fileObject = new File([fileBlob], file.fileName, { type: 'text/plain' });
        
        await workspace.uploadPdf.mutateAsync({ 
          name: fileName, 
          file: fileObject
        });
      }

      setGenerationSuccess(true);
      
      // Reset form
      setCourseInput({
        courseName: '',
        duration: '',
        audience: '',
        goals: '',
        modules: [''],
      });
      setShowSynopsis(false);
      setCourseSynopsis(null);
      
      setTimeout(() => setGenerationSuccess(false), 5000);
    } catch (error) {
      console.error('Course generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Show loading state during validation
  if (isValidating) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Validating session...</p>
        </div>
      </div>
    );
  }

  // Show login gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-12">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Program Director Playbook</CardTitle>
            <CardDescription>Enter your credentials to access the admin workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  disabled={isLoggingIn}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  disabled={isLoggingIn}
                />
              </div>

              {loginError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}

              <GreenButton type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </GreenButton>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show workspace if authenticated
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Program Director Playbook</h1>
          <p className="text-muted-foreground">Admin workspace for managing content and operations</p>
        </div>
        <GreenButton variant="outline" onClick={logout}>
          Logout
        </GreenButton>
      </div>

      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="password">
            <Key className="h-4 w-4 mr-2" />
            Password
          </TabsTrigger>
          <TabsTrigger value="pdfs">
            <FileText className="h-4 w-4 mr-2" />
            PDFs
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="meetings">
            <Video className="h-4 w-4 mr-2" />
            Meetings
          </TabsTrigger>
          <TabsTrigger value="courses">
            <BookOpen className="h-4 w-4 mr-2" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="suggestions">
            <Lightbulb className="h-4 w-4 mr-2" />
            Suggestions
          </TabsTrigger>
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
        </TabsList>

        {/* Password Management */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your playbook access password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              {passwordChangeError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{passwordChangeError}</AlertDescription>
                </Alert>
              )}

              {passwordChangeSuccess && (
                <Alert className="bg-primary/10 border-primary">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-foreground">
                    Password changed successfully!
                  </AlertDescription>
                </Alert>
              )}

              <GreenButton
                onClick={handlePasswordChange}
                disabled={workspace.changePassword.isPending || !newPassword || !confirmPassword}
              >
                {workspace.changePassword.isPending ? 'Changing...' : 'Change Password'}
              </GreenButton>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PDF Management */}
        <TabsContent value="pdfs">
          <Card>
            <CardHeader>
              <CardTitle>PDF Files</CardTitle>
              <CardDescription>Upload and manage PDF documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pdfName">Document Name</Label>
                  <Input
                    id="pdfName"
                    value={pdfName}
                    onChange={(e) => setPdfName(e.target.value)}
                    placeholder="Enter document name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pdfFile">Select PDF File</Label>
                  <Input
                    id="pdfFile"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  />
                </div>

                {uploadSuccess && (
                  <Alert className="bg-primary/10 border-primary">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-foreground">
                      PDF uploaded successfully!
                    </AlertDescription>
                  </Alert>
                )}

                <GreenButton
                  onClick={handlePdfUpload}
                  disabled={workspace.uploadPdf.isPending || !pdfFile || !pdfName}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {workspace.uploadPdf.isPending ? 'Uploading...' : 'Upload PDF'}
                </GreenButton>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Uploaded PDFs</h3>
                {workspace.pdfFilesLoading ? (
                  <p className="text-muted-foreground">Loading PDFs...</p>
                ) : workspace.pdfFiles.length === 0 ? (
                  <p className="text-muted-foreground">No PDFs uploaded yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workspace.pdfFiles.map((pdf) => (
                        <TableRow key={pdf.id.toString()}>
                          <TableCell>{pdf.name}</TableCell>
                          <TableCell>
                            <a
                              href={pdf.blob.getDirectURL()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline inline-flex items-center gap-1"
                            >
                              Open <ExternalLink className="h-3 w-3" />
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Events */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendar Events</CardTitle>
              <CardDescription>Create and manage calendar events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eventTitle">Event Title</Label>
                  <Input
                    id="eventTitle"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Enter event title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDescription">Description</Label>
                  <Textarea
                    id="eventDescription"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Enter event description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventStartTime">Start Time</Label>
                    <Input
                      id="eventStartTime"
                      type="datetime-local"
                      value={eventStartTime}
                      onChange={(e) => setEventStartTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventEndTime">End Time</Label>
                    <Input
                      id="eventEndTime"
                      type="datetime-local"
                      value={eventEndTime}
                      onChange={(e) => setEventEndTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventLocation">Location</Label>
                  <Input
                    id="eventLocation"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Enter event location"
                  />
                </div>

                <GreenButton
                  onClick={handleCreateOrEditEvent}
                  disabled={
                    workspace.createEvent.isPending ||
                    workspace.editEvent.isPending ||
                    !eventTitle ||
                    !eventStartTime ||
                    !eventEndTime
                  }
                >
                  {editingEventId ? 'Update Event' : 'Create Event'}
                </GreenButton>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Upcoming Events</h3>
                {workspace.eventsLoading ? (
                  <p className="text-muted-foreground">Loading events...</p>
                ) : workspace.events.length === 0 ? (
                  <p className="text-muted-foreground">No events scheduled.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workspace.events.map((event) => (
                        <TableRow key={event.id.toString()}>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>
                            {new Date(Number(event.startTime) / 1000000).toLocaleString()}
                          </TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell className="space-x-2">
                            <button
                              onClick={() => handleEditEvent(event)}
                              className="text-primary hover:underline inline-flex items-center gap-1"
                            >
                              <Edit className="h-3 w-3" /> Edit
                            </button>
                            <button
                              onClick={() => workspace.deleteEvent.mutate(event.id)}
                              className="text-destructive hover:underline inline-flex items-center gap-1"
                            >
                              <Trash2 className="h-3 w-3" /> Delete
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meeting Links */}
        <TabsContent value="meetings">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Links</CardTitle>
              <CardDescription>Manage video meeting links (Zoom, Google Meet, etc.)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meetingTitle">Meeting Title</Label>
                  <Input
                    id="meetingTitle"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    placeholder="Enter meeting title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meetingUrl">Meeting URL</Label>
                  <Input
                    id="meetingUrl"
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    placeholder="https://zoom.us/j/..."
                  />
                </div>

                <GreenButton
                  onClick={handleAddMeetingLink}
                  disabled={workspace.addMeetingLink.isPending || !meetingTitle || !meetingUrl}
                >
                  {workspace.addMeetingLink.isPending ? 'Adding...' : 'Add Meeting Link'}
                </GreenButton>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Saved Meeting Links</h3>
                {workspace.meetingLinksLoading ? (
                  <p className="text-muted-foreground">Loading meeting links...</p>
                ) : workspace.meetingLinks.length === 0 ? (
                  <p className="text-muted-foreground">No meeting links saved.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workspace.meetingLinks.map((meeting) => (
                        <TableRow key={meeting.id.toString()}>
                          <TableCell>{meeting.title}</TableCell>
                          <TableCell className="max-w-xs truncate">{meeting.url}</TableCell>
                          <TableCell className="space-x-2">
                            <a
                              href={meeting.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline inline-flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" /> Open
                            </a>
                            <button
                              onClick={() => workspace.deleteMeetingLink.mutate(meeting.id)}
                              className="text-destructive hover:underline inline-flex items-center gap-1"
                            >
                              <Trash2 className="h-3 w-3" /> Delete
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Course Builder */}
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>AI Course Builder</CardTitle>
              <CardDescription>Create comprehensive courses with AI assistance (1 hour - 8 weeks)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showSynopsis ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input
                      id="courseName"
                      value={courseInput.courseName}
                      onChange={(e) => setCourseInput(prev => ({ ...prev, courseName: e.target.value }))}
                      placeholder="e.g., Trauma Basics 101"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={courseInput.duration}
                      onChange={(e) => setCourseInput(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 1 hour, 3 days, 2 weeks"
                    />
                    {durationError && (
                      <p className="text-sm text-destructive">{durationError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audience">Target Audience</Label>
                    <Input
                      id="audience"
                      value={courseInput.audience}
                      onChange={(e) => setCourseInput(prev => ({ ...prev, audience: e.target.value }))}
                      placeholder="e.g., trauma survivors, beginners"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals">Course Goals</Label>
                    <Textarea
                      id="goals"
                      value={courseInput.goals}
                      onChange={(e) => setCourseInput(prev => ({ ...prev, goals: e.target.value }))}
                      placeholder="What should students learn or achieve?"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Course Modules</Label>
                    {courseInput.modules.map((module, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={module}
                          onChange={(e) => handleModuleChange(idx, e.target.value)}
                          placeholder={`Module ${idx + 1} topic`}
                        />
                        {courseInput.modules.length > 1 && (
                          <GreenButton
                            variant="outline"
                            onClick={() => handleRemoveModule(idx)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </GreenButton>
                        )}
                      </div>
                    ))}
                    <GreenButton variant="outline" onClick={handleAddModule}>
                      Add Module
                    </GreenButton>
                  </div>

                  <GreenButton
                    onClick={handleGenerateSynopsis}
                    disabled={!courseInput.courseName || !courseInput.duration || !courseInput.audience || !courseInput.goals || courseInput.modules.some(m => !m.trim())}
                  >
                    Generate Course Synopsis
                  </GreenButton>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert className="bg-primary/10 border-primary">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-foreground">
                      <h4 className="font-semibold mb-2">Course Synopsis</h4>
                      <p className="mb-2"><strong>Title:</strong> {courseSynopsis.title}</p>
                      <p className="mb-2"><strong>Duration:</strong> {courseSynopsis.duration}</p>
                      <p className="mb-2"><strong>Audience:</strong> {courseSynopsis.audience}</p>
                      <p className="mb-2"><strong>Purpose:</strong> {courseSynopsis.purpose}</p>
                      <p className="mb-2"><strong>Overview:</strong> {courseSynopsis.overview}</p>
                      <div className="mb-2">
                        <strong>Learning Outcomes:</strong>
                        <ul className="list-disc pl-5 mt-1">
                          {courseSynopsis.learningOutcomes.map((outcome: string, idx: number) => (
                            <li key={idx}>{outcome}</li>
                          ))}
                        </ul>
                      </div>
                    </AlertDescription>
                  </Alert>

                  {generationSuccess && (
                    <Alert className="bg-primary/10 border-primary">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <AlertDescription className="text-foreground">
                        Course materials generated and saved successfully! Check the PDFs tab to view all files.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-2">
                    <GreenButton
                      onClick={handleGenerateCourse}
                      disabled={isGenerating}
                      className="flex-1"
                    >
                      {isGenerating ? 'Generating Course Materials...' : 'Generate & Save Course Materials'}
                    </GreenButton>
                    <GreenButton
                      variant="outline"
                      onClick={() => {
                        setShowSynopsis(false);
                        setCourseSynopsis(null);
                      }}
                    >
                      Edit
                    </GreenButton>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product Suggestions */}
        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>Product Suggestions</CardTitle>
              <CardDescription>Review user feedback and suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              {suggestionsLoading ? (
                <p className="text-muted-foreground">Loading suggestions...</p>
              ) : !suggestions || suggestions.length === 0 ? (
                <p className="text-muted-foreground">No suggestions submitted yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Suggestion</TableHead>
                      <TableHead>Author</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suggestions.map((suggestion) => (
                      <TableRow key={suggestion.id.toString()}>
                        <TableCell>
                          {new Date(Number(suggestion.timestamp) / 1000000).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="max-w-md">{suggestion.suggestion}</TableCell>
                        <TableCell className="text-xs text-muted-foreground truncate max-w-[150px]">
                          {suggestion.author.toString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Overview */}
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total PDFs</span>
                  <span className="font-semibold">{workspace.pdfFiles.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Upcoming Events</span>
                  <span className="font-semibold">{workspace.events.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Meeting Links</span>
                  <span className="font-semibold">{workspace.meetingLinks.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">User Suggestions</span>
                  <span className="font-semibold">{suggestions?.length || 0}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workspace Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This is your admin workspace for managing the I'm Fine application. Use the tabs above to:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  <li>Change your playbook password</li>
                  <li>Upload and manage PDF documents</li>
                  <li>Create and edit calendar events</li>
                  <li>Manage video meeting links</li>
                  <li>Build comprehensive courses with AI assistance</li>
                  <li>Review user product suggestions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
