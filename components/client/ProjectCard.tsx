// import Link from 'next/link';
// import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
// import { format } from 'date-fns';
// import StatusBadge from '@/components/ui/StatusBadge';
// import ProgressBar from '@/components/ui/ProgressBar';
// import Card from '@/components/ui/Card';

// interface Project {
//   id: string;
//   name: string;
//   description: string;
//   status: string;
//   progress: number;
//   updatedAt: Date | string;
//   manager: {
//     name: string;
//   };
//   _count: {
//     milestones: number;
//     files: number;
//     changeRequests: number;
//   };
// }

// interface ProjectCardProps {
//   project: Project;
// }

// export default function ProjectCard({ project }: ProjectCardProps) {
//   const truncateText = (text: string, maxLength: number) => {
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + '...';
//   };

//   return (
//     <Link href={`/client/projects/${project.id}`}>
//       <Card hoverable className="group relative overflow-hidden border-white/15 bg-gradient-to-br from-slate-900/80 to-slate-900/55 backdrop-blur-xl shadow-[0_24px_60px_rgba(2,6,23,0.55)] h-[55vh]">
//         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_40%)]" />
//         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
//           <h3 className="text-lg sm:text-xl font-bold text-text-primary flex-1 pr-0 sm:pr-4 group-hover:text-accent transition-colors duration-200 break-words">
//             {project.name}
//           </h3>
//           <StatusBadge status={project.status} type="project" variant="dark" />
//         </div>

//         <p className="text-sm text-text-muted mb-5 line-clamp-2 min-h-[40px]">
//           {truncateText(project.description, 120)}
//         </p>

//         <div className="mb-5">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-xs font-semibold text-text-muted">Progress</span>
//             <span className="text-xs font-bold text-accent">{project.progress}%</span>
//           </div>
//           <ProgressBar progress={project.progress} showLabel={false} />
//         </div>

//         <div className="space-y-3 pt-4 border-t border-border-default">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
//             <div className="flex items-center text-text-muted">
//               <FiUser className="w-4 h-4 mr-2 text-text-disabled" />
//               <span className="font-medium">{project.manager.name}</span>
//             </div>
//             <div className="flex items-center text-text-muted">
//               <FiCalendar className="w-4 h-4 mr-2" />
//               <span className="text-xs">{format(new Date(project.updatedAt), 'MMM d, yyyy')}</span>
//             </div>
//           </div>

//           <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
//             <div className="flex items-center gap-2 text-[11px] text-text-muted flex-wrap">
//               <span className="rounded-full border border-white/10 bg-slate-800/70 px-2 py-1 font-medium">
//                 {project._count.milestones} Milestones
//               </span>
//               <span className="rounded-full border border-white/10 bg-slate-800/70 px-2 py-1 font-medium">
//                 {project._count.files} Files
//               </span>
//               <span className="rounded-full border border-white/10 bg-slate-800/70 px-2 py-1 font-medium">
//                 {project._count.changeRequests} Requests
//               </span>
//             </div>
//             <FiArrowRight className="w-5 h-5 text-text-disabled group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" />
//           </div>
//         </div>
//       </Card>
//     </Link>
//   );
// }


import Link from 'next/link';
import { FiCalendar, FiUser, FiArrowRight, FiFile } from 'react-icons/fi';
import { format } from 'date-fns';
import StatusBadge from '@/components/ui/StatusBadge';
import Card from '@/components/ui/Card';
import ProgressBarProps from '@/components/client/ProgressBarProps';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  updatedAt: Date | string;
  expectedEndDate: Date | string | null;
  manager: {
    name: string;
  };
  _count: {
    milestones: number;
    files: number;
    changeRequests: number;
  };
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Format date for display - using date format instead of time
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return 'TBD';

    try {
      return format(new Date(date), 'MMM d');
    } catch {
      return 'Invalid date';
    }  };

  return (
    <Link href={`/client/projects/${project.id}`}>
      <Card hoverable className="group h-fit md:h-80 relative overflow-hidden border border-border-default bg-bg-surface hover:border-accent/30 transition-all duration-300">
        {/* Minimal gradient accent */}
        <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-accent transition-all duration-500" />

        <div className="p-4">
          {/* Header with status */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
              {project.name}
            </h3>
            <StatusBadge
              status={project.status}
              type="project"
              variant="dark"
            />
          </div>

          {/* Description - minimal */}
          <p className="text-sm text-text-muted mb-4 line-clamp-2">
            {truncateText(project.description, 100)}
          </p>

          {/* Date range - using calendar icons */}
          <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
            <div className="flex items-center gap-1">
              <FiCalendar className="w-3.5 h-3.5" />
              <span>{formatDate(project.updatedAt)}</span>
            </div>
            <span>—</span>
            <div className="flex items-center gap-1">
              <FiCalendar className="w-3.5 h-3.5" />
              <span>{formatDate(project.expectedEndDate)}</span>
            </div>
          </div>

          {/* Progress section - minimal */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-text-muted">Progress</span>
              <span className="text-xs font-medium text-accent">{project.progress}%</span>
            </div>
            <ProgressBarProps
              progress={project.progress}
              showLabel={false}
              className="h-1.5 bg-bg-subtle"
              barClassName="bg-accent"
            />
          </div>

          {/* Footer with participants and files */}
          <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
            {/* Participants - manager + team indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center">
                  <FiUser className="w-3.5 h-3.5 text-accent" />
                </div>
              </div>
              <span className="text-xs text-text-muted">
                {project.manager.name}
              </span>
            </div>

            {/* Files count */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <FiFile className="w-3.5 h-3.5" />
                <span>{project._count.files} files</span>
              </div>
              <FiArrowRight className="w-4 h-4 text-text-disabled group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          {/* Optional: Show milestone count as a subtle indicator */}
          {project._count.milestones > 0 && (
            <div className="absolute top-3 right-3">
              <span className="text-[10px] text-text-muted">
                {project._count.milestones} milestones
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}