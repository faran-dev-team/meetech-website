// components/client/ClientDashboardContent.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
     LayoutDashboard,
     CheckSquare,
     MessageSquare,
     Activity,
     Calendar,
     Settings,
     ChevronRight,
     Clock,
     Users,
     FileText,
     Paperclip,
     MoreHorizontal,
     Star,
     Bell,
     Search,
     Plus
} from 'lucide-react';
import { useState } from 'react';
import ProjectCard from './ProjectCard';

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

interface ClientDashboardContentProps {
     projects: Project[];
     activeProjects: Project[];
     completedProjects: Project[];
     firstName: string;
     userInitials: string;
     projectsCount: number;
     userEmail: string;
}

export default function ClientDashboardContent({
     projects,
     activeProjects,
     completedProjects,
     firstName,
     userInitials,
     projectsCount,
     userEmail }: ClientDashboardContentProps) {
     console.log("Projects", projects)


     return (
          <div className="flex text-text-primary p-4 md:p-10">


               {/* ===== MAIN CONTENT ===== */}
               <main className="flex-1 overflow-y-auto ">

                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between mb-4">

                         <nav className="flex text-text-muted p-2 rounded-lg border border-accent/15 bg-accent/10" aria-label="Breadcrumb">
                              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                   <li className="inline-flex items-center">
                                        <a href="/" className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand">
                                             <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" /></svg>
                                             Home
                                        </a>
                                   </li>
                                   <li>
                                        <div className="flex items-center space-x-1.5">
                                             <svg className="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" /></svg>
                                             <a href="#" className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand">Client</a>
                                        </div>
                                   </li>
                                   <li aria-current="page">
                                        <div className="flex items-center space-x-1.5">
                                             <svg className="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" /></svg>
                                             <span className="inline-flex items-center text-sm font-medium text-body-subtle">Dashboard</span>
                                        </div>
                                   </li>
                              </ol>
                         </nav>
                         <div className=" w-full flex justify-end md:items-center gap-4">


                              <a href='/client/book-meeting' className="px-4 py-2 bg-accent/80 hover:bg-accent/60 rounded-xl text-sm font-medium flex items-center gap-2 transition">
                                   <Plus size={16} />
                                   New Project
                              </a>
                              <a href="/client/profile" className="w-10 h-10 hidden md:inline-flex items-center justify-center hover:bg-accent/80 rounded-xl transition bg-accent/80 ">
                                   <span className="">{userInitials}</span>
                              </a>
                         </div>
                    </div>


                    <div className="py-8 w-full xl:w-[80%]">
                         {/* Header */}
                         <div className="flex items-center justify-between mb-8">
                              <div>
                                   <h2 className="text-3xl lg:text-5xl font-bold">Welcome back, {firstName}</h2>
                                   <p className="text-text-muted mt-1 text-sm">
                                        Track your projects, upload requirements, and schedule meetings all from one place.
                                   </p>
                              </div>

                         </div>

                         {/* Quick Stats */}
                         <div className="my-8 grid grid-cols-2  md:grid-cols-4  gap-3 ">
                              <StatCard
                                   label="Projects"
                                   value={projectsCount}
                              // color="blue"
                              />
                              <StatCard
                                   label="Active"
                                   value={activeProjects.length}
                              // color="green"
                              />
                              <StatCard
                                   label="Completed"
                                   value={completedProjects.length}
                              // color="purple"
                              />
                              <StatCard
                                   label="Response"
                                   value="<24h"
                              // color="yellow"
                              />
                         </div>

                         {/* Projects Grid */}
                         <div className="mt-10">
                              <h3 className="font-semibold mb-4 text-3xl">Your Projects</h3>
                              <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-4">
                                   {projects.slice(0, 3).map((project) => (
                                        <ProjectCard key={project.id} project={project} />
                                   ))}
                              </div>
                         </div>
                         {/* Today Section */}

                    </div>
               </main>
          </div>
     );
}

// ===== Helper Components =====

function StatCard({ label, value }: { label: string; value: number | string }) {
     // const colorClasses = {
     //      blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/20',
     //      green: 'from-green-500/20 to-green-500/5 border-green-500/20',
     //      purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20',
     //      yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/20',
     // };

     return (
          <div className={`bg-gradient-to-br from-accent/20 to-accent/5 border-blue-500/20 rounded-xl p-4 border`}>
               <p className="text-xs text-white/60">{label}</p>
               <p className="text-xl font-bold mt-1">{value}</p>
          </div>
     );
}

