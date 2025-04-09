
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminProjectForm from '@/components/admin/AdminProjectForm';
import AdminProjectList from '@/components/admin/AdminProjectList';
import { supabase } from '@/integrations/supabase/client';
import { projectService } from '@/services/projectService';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      // Check if user is admin or has the specific admin email
      const isAdminUser = user.email === 'chandan143css@gmail.com' || await projectService.isAdmin();
      
      setIsAdmin(isAdminUser);
      if (!isAdminUser) {
        navigate('/');
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive"
        });
      } else {
        // If user has admin email but is not in admin_users table, add them
        if (user.email === 'chandan143css@gmail.com') {
          const { data: adminCheck } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();
            
          if (!adminCheck) {
            await supabase.from('admin_users').insert({ id: user.id });
          }
        }
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleAddProject}>
            <Plus className="mr-2 h-4 w-4" /> Add New Project
          </Button>
        </div>

        {showForm ? (
          <AdminProjectForm 
            project={editingProject} 
            onClose={handleFormClose} 
          />
        ) : (
          <AdminProjectList onEdit={handleEditProject} />
        )}
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
