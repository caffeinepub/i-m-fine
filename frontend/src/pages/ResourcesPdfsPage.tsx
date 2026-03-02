import { useState } from 'react';
import { FileText, Download, BookOpen, Lightbulb } from 'lucide-react';
import ResourceCard from '@/components/content/ResourceCard';
import InAppResourceViewer from '@/components/content/InAppResourceViewer';
import {
  worksheetsExercises,
  guidesHandbooks,
  educationalMaterials,
  templatesPlanners,
  ResourceItem,
} from '@/content/catalog';

export default function ResourcesPdfsPage() {
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const handleViewInApp = (item: ResourceItem) => {
    setSelectedResource(item);
    setViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setViewerOpen(false);
    setTimeout(() => setSelectedResource(null), 300);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
          Resources & PDFs
        </h1>
        <p className="text-lg text-muted-foreground">
          Downloadable guides, worksheets, and resources to support your healing journey.
        </p>
      </div>

      {/* Worksheets & Exercises */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Worksheets & Exercises</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Practical worksheets for self-reflection, emotional regulation, and personal growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {worksheetsExercises.map((item, index) => (
            <ResourceCard key={index} item={item} onViewInApp={handleViewInApp} />
          ))}
        </div>
      </section>

      {/* Guides & Handbooks */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Guides & Handbooks</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Comprehensive guides for understanding trauma, building resilience, and developing coping strategies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guidesHandbooks.map((item, index) => (
            <ResourceCard key={index} item={item} onViewInApp={handleViewInApp} />
          ))}
        </div>
      </section>

      {/* Educational Materials */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Educational Materials</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Learn about mental health, trauma responses, and the science behind healing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {educationalMaterials.map((item, index) => (
            <ResourceCard key={index} item={item} onViewInApp={handleViewInApp} />
          ))}
        </div>
      </section>

      {/* Templates & Planners */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Download className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Templates & Planners</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Organize your healing journey with helpful templates for tracking, planning, and reflection.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templatesPlanners.map((item, index) => (
            <ResourceCard key={index} item={item} onViewInApp={handleViewInApp} />
          ))}
        </div>
      </section>

      {/* In-App Resource Viewer */}
      <InAppResourceViewer
        item={selectedResource}
        open={viewerOpen}
        onClose={handleCloseViewer}
      />
    </div>
  );
}
