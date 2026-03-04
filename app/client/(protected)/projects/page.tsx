
import { auth } from '@/lib/auth/auth';
import { getProjectsByClient } from '@/lib/db/queries/projects';
import ProjectCard from '@/components/client/ProjectCard';
import { FiFolder, FiArrowRight, FiFilter, FiPlus } from 'react-icons/fi';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ClientDashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/client/login');
  }

  const projects = await getProjectsByClient(session.user.id);

  const activeProjects = projects.filter(p => ['PLANNING', 'IN_PROGRESS'].includes(p.status));
  const completedProjects = projects.filter(p => p.status === 'COMPLETED');

  const firstName = session.user.name?.split(' ')[0] || 'there';

  return (
    <div className="space-y-8">
            {/* Projects Overview Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-blue-950/70 to-indigo-950/70 p-7 sm:p-10 shadow-[0_30px_80px_rgba(30,64,175,0.45)]">
                 {/* Pattern Overlay */}
                 <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px, 40px 40px' }} />

                 <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">

                      {/* Left Side: Context */}
                      <div className="flex-1">
                           <div className="flex items-center gap-2 mb-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <p className="text-text-inverse/70 text-sm font-medium uppercase tracking-wider">
                                     Project Workspace
                                </p>
                           </div>

                           <h1 className="text-3xl sm:text-4xl font-bold text-text-inverse tracking-tight">
                                All Projects
                           </h1>

                           <p className="text-text-inverse/80 mt-3 text-sm sm:text-base max-w-md leading-relaxed">
                                Manage your active initiatives, monitor progress, and access deliverables across your entire portfolio.
                           </p>

                           <div className="flex flex-wrap gap-3 mt-6">
                                <Link href="client/book-meeting" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-semibold hover:bg-blue-50 transition-all shadow-lg active:scale-95">
                                     <FiPlus className="w-4 h-4" /> Start New Project
                                </Link>
                               
                           </div>
                      </div>

                      {/* Right Side: Quick Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                                <HeroStat label="Projects" value={String(projects.length)} />
                                <HeroStat label="Active" value={String(activeProjects.length)} />
                                <HeroStat label="Completed" value={String(completedProjects.length)} />
                                <HeroStat label="Response" value="< 24h" />
                         
                      </div>

                 </div>
            </div>
   
      {/* Projects */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Your Projects
          </h2>
          {projects.length > 0 && (
            <span className="text-xs font-semibold text-text-muted bg-bg-subtle px-3 py-1 rounded-full border border-border-default">
              {projects.length} total
            </span>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-white/15 bg-slate-900/55 backdrop-blur-xl">
            <div className="w-16 h-16 bg-accent-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiFolder className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-1.5">
              No projects yet
            </h3>
            <p className="text-sm text-text-muted max-w-sm mx-auto">
              Your projects will appear here once they are assigned to you by your project manager.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 backdrop-blur">
      <p className="text-[10px] uppercase tracking-wide text-blue-100/75">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

