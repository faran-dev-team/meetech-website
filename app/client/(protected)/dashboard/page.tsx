
import { auth } from '@/lib/auth/auth';
import { getProjectsByClient } from '@/lib/db/queries/projects';
import ProjectCard from '@/components/client/ProjectCard';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IconType } from "react-icons";
import { FiArrowRight, FiFolder, FiActivity, FiCheckCircle, FiClock } from 'react-icons/fi';


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
    <div className="space-y-8 p-4">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-blue-950/70 to-indigo-950/70 p-7 sm:p-8 py-6 md:py-6 shadow-[0_30px_80px_rgba(30,64,175,0.45)]">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px, 40px 40px' }} />
        <div className="relative z-10">
          <p className="text-text-inverse/70 text-sm font-medium mb-1">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-inverse tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="text-text-inverse/80 mt-1.5 text-sm sm:text-base max-w-lg">
            Track your projects, upload requirements, and schedule meetings all from one place.
          </p>
          {/* <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/client/dashboard?modal=booking"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/15 text-text-inverse text-sm font-medium hover:bg-white/25 transition-colors"
            >
              Book a Meeting <FiArrowRight className="w-4 h-4" />
            </Link>
          </div> */}
          
        </div>
      </div>

      {/* Quick actions */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickAction
          title="Book a Meeting"
          description="Pick a slot and discuss progress."
          href="/client/book-meeting"
        />
        <QuickAction
          title="Open Messages"
          description="Chat directly with your manager."
          href="/client/messages"
        />
        <QuickAction
          title="Update Profile"
          description="Keep contact details up to date."
          href="/client/profile"
        />
      </div> */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <HeroStat label="Projects" value={String(projects.length)} icon={<FiFolder className="w-4 h-4 text-blue-400" />} />
        <HeroStat label="Active" value={String(activeProjects.length)} icon={<FiActivity className="w-4 h-4 text-green-400" />} />
        <HeroStat label="Completed" value={String(completedProjects.length)} icon={<FiCheckCircle className="w-4 h-4 text-purple-400" />} />
        <HeroStat label="Response" value="< 24h" icon={<FiClock className="w-4 h-4 text-yellow-400" />} />
      </div>
      {/* Projects */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Your Projects
          </h2>
          {projects.length > 0 && (
            <Link  href="/client/projects" className="text-xs flex justify-center items-center font-semibold text-text-muted bg-bg-subtle px-3 py-1 rounded-full border border-border-default hover:text-accent hover:border-accent transition-all duration-300"> <span>View All</span>
              <ArrowRight size={16} /> 
              {/* {projects.length} total */}
            </Link>
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
            {projects.slice(0,3)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuickAction({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-white/15 bg-slate-900/60 backdrop-blur-xl p-4 hover:border-blue-400/40 hover:shadow-[0_16px_40px_rgba(37,99,235,0.2)] transition-all"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        <FiArrowRight className="w-4 h-4 text-blue-300" />
      </div>
      <p className="text-xs text-text-muted mt-1">{description}</p>
    </Link>
  );
}

function HeroStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border border-white/15 bg-slate-900/60 backdrop-blur-xl p-4 hover:border-blue-400/40 hover:shadow-[0_16px_40px_rgba(37,99,235,0.2)] transition-all"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm font-semibold text-text-primary">{label}</p>
        </div>
      </div>
      <p className="text-lg text-text-muted mt-1 font-bold group-hover:text-accent">{value}</p>
    </div>
  );
}