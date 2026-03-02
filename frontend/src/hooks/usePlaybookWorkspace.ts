import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob, PdfFile, Event, MeetingLink } from '../backend';

export function usePlaybookWorkspace(token: string | null) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  // PDF Files
  const pdfFilesQuery = useQuery<PdfFile[]>({
    queryKey: ['pdfFiles'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.listPdfFiles();
    },
    enabled: !!actor && !!token,
  });

  const uploadPdfMutation = useMutation({
    mutationFn: async ({ name, file }: { name: string; file: File }) => {
      if (!actor || !token) throw new Error('Not authenticated');
      
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array);
      
      return actor.savePdfFile(token, name, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pdfFiles'] });
    },
  });

  // Calendar Events
  const eventsQuery = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getEvents();
    },
    enabled: !!actor && !!token,
  });

  const createEventMutation = useMutation({
    mutationFn: async (event: {
      title: string;
      description: string;
      startTime: bigint;
      endTime: bigint;
      location: string;
    }) => {
      if (!actor || !token) throw new Error('Not authenticated');
      return actor.createEvent(
        token,
        event.title,
        event.description,
        event.startTime,
        event.endTime,
        event.location
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const editEventMutation = useMutation({
    mutationFn: async (event: {
      id: bigint;
      title: string;
      description: string;
      startTime: bigint;
      endTime: bigint;
      location: string;
    }) => {
      if (!actor || !token) throw new Error('Not authenticated');
      return actor.editEvent(
        token,
        event.id,
        event.title,
        event.description,
        event.startTime,
        event.endTime,
        event.location
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor || !token) throw new Error('Not authenticated');
      return actor.deleteEvent(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  // Meeting Links
  const meetingLinksQuery = useQuery<MeetingLink[]>({
    queryKey: ['meetingLinks'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMeetingLinks();
    },
    enabled: !!actor && !!token,
  });

  const addMeetingLinkMutation = useMutation({
    mutationFn: async ({ title, url }: { title: string; url: string }) => {
      if (!actor || !token) throw new Error('Not authenticated');
      return actor.addMeetingLink(token, title, url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingLinks'] });
    },
  });

  const deleteMeetingLinkMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor || !token) throw new Error('Not authenticated');
      return actor.deleteMeetingLink(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingLinks'] });
    },
  });

  // Password Change
  const changePasswordMutation = useMutation({
    mutationFn: async (newPassword: string) => {
      if (!actor || !token) throw new Error('Not authenticated');
      return actor.changePlaybookPassword(token, newPassword);
    },
  });

  return {
    // PDF Files
    pdfFiles: pdfFilesQuery.data || [],
    pdfFilesLoading: pdfFilesQuery.isLoading,
    uploadPdf: uploadPdfMutation,
    
    // Events
    events: eventsQuery.data || [],
    eventsLoading: eventsQuery.isLoading,
    createEvent: createEventMutation,
    editEvent: editEventMutation,
    deleteEvent: deleteEventMutation,
    
    // Meeting Links
    meetingLinks: meetingLinksQuery.data || [],
    meetingLinksLoading: meetingLinksQuery.isLoading,
    addMeetingLink: addMeetingLinkMutation,
    deleteMeetingLink: deleteMeetingLinkMutation,
    
    // Password
    changePassword: changePasswordMutation,
  };
}
