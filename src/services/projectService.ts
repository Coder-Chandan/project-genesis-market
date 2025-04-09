
import { supabase } from '@/integrations/supabase/client';
import { Project, ProjectFile } from '@/integrations/supabase/custom-types';

export const projectService = {
  // Project related functions
  getProjects: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*');
    
    if (error) throw error;
    return data as Project[];
  },

  getProjectById: async (id: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  getFeaturedProjects: async (limit = 4) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .limit(limit);
    
    if (error) throw error;
    return data as Project[];
  },

  getRelatedProjects: async (category: string, currentId: string, limit = 4) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .neq('id', currentId)
      .limit(limit);
    
    if (error) throw error;
    return data as Project[];
  },

  createProject: async (project: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  updateProject: async (id: string, project: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  deleteProject: async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Project files related functions
  getProjectFiles: async (projectId: string) => {
    const { data, error } = await supabase
      .from('project_files')
      .select('*')
      .eq('project_id', projectId);
    
    if (error) throw error;
    return data as ProjectFile[];
  },

  uploadProjectFile: async (
    projectId: string, 
    fileType: 'ui' | 'code' | 'documentation', 
    file: File
  ) => {
    const filePath = `${projectId}/${fileType}/${file.name}`;
    
    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from('project_files')
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('project_files')
      .getPublicUrl(filePath);
    
    // Create record in project_files table
    const { data, error } = await supabase
      .from('project_files')
      .insert({
        project_id: projectId,
        file_type: fileType,
        file_path: urlData.publicUrl,
        file_name: file.name
      })
      .select()
      .single();

    if (error) throw error;
    return data as ProjectFile;
  },

  deleteProjectFile: async (id: string, filePath: string) => {
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('project_files')
      .remove([filePath]);
    
    if (storageError) throw storageError;
    
    // Delete from database
    const { error } = await supabase
      .from('project_files')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Admin specific functions
  isAdmin: async () => {
    const { data, error } = await supabase.rpc('is_admin');
    if (error) throw error;
    return data as boolean;
  },

  addAdmin: async (email: string) => {
    // Since we can't directly query auth.users table through the JS client,
    // we would need to implement this through a Supabase function or API endpoint
    // For now, we'll just return a placeholder
    console.warn('Admin functionality requires a server-side implementation');
    return false;
  },
};
