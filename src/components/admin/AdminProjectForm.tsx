
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { X, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface AdminProjectFormProps {
  project?: any;
  onClose: () => void;
}

interface ProjectFormValues {
  title: string;
  description: string;
  category: string;
  price: string;
  ui_price: string;
  code_price: string;
  documentation_price: string;
  author: string;
}

const AdminProjectForm: React.FC<AdminProjectFormProps> = ({ project, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [uploadingUI, setUploadingUI] = useState<boolean>(false);
  const [uploadingCode, setUploadingCode] = useState<boolean>(false);
  const [uploadingDocs, setUploadingDocs] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(project?.image_url || null);
  const [uiFileName, setUiFileName] = useState<string | null>(null);
  const [codeFileName, setCodeFileName] = useState<string | null>(null);
  const [docsFileName, setDocsFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      category: project?.category || '',
      price: project?.price?.toString() || '',
      ui_price: project?.ui_price?.toString() || '',
      code_price: project?.code_price?.toString() || '',
      documentation_price: project?.documentation_price?.toString() || '',
      author: project?.author || '',
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      setLoading(true);
      
      const projectData = {
        title: data.title,
        description: data.description,
        category: data.category,
        price: parseFloat(data.price),
        ui_price: data.ui_price ? parseFloat(data.ui_price) : null,
        code_price: data.code_price ? parseFloat(data.code_price) : null,
        documentation_price: data.documentation_price ? parseFloat(data.documentation_price) : null,
        author: data.author,
        image_url: imagePreview,
      };
      
      let projectId;
      
      if (project) {
        // Update existing project
        const { data: updatedProject, error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id)
          .select()
          .single();
          
        if (error) throw error;
        projectId = project.id;
        
        toast({
          title: "Project Updated",
          description: "The project has been updated successfully.",
        });
      } else {
        // Insert new project
        const { data: newProject, error } = await supabase
          .from('projects')
          .insert(projectData)
          .select()
          .single();
          
        if (error) throw error;
        projectId = newProject.id;
        
        toast({
          title: "Project Created",
          description: "The project has been created successfully.",
        });
      }
      
      onClose();
    } catch (error: any) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      setUploadingImage(true);
      
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `project-images/${fileName}`;
      
      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('project_files')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('project_files')
        .getPublicUrl(filePath);
        
      setImagePreview(data.publicUrl);
      
      toast({
        title: "Image Uploaded",
        description: "Project image has been uploaded successfully.",
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>, 
    fileType: 'ui' | 'code' | 'documentation',
    setUploading: React.Dispatch<React.SetStateAction<boolean>>,
    setFileName: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      setUploading(true);
      
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `project-files/${fileType}/${fileName}`;
      
      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('project_files')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // If this is for an existing project, add the file reference to project_files
      if (project?.id) {
        const { error: fileRefError } = await supabase
          .from('project_files')
          .insert({
            project_id: project.id,
            file_type: fileType,
            file_path: filePath,
            file_name: file.name,
          });
          
        if (fileRefError) throw fileRefError;
      }
      
      setFileName(file.name);
      
      toast({
        title: "File Uploaded",
        description: `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} file has been uploaded successfully.`,
      });
    } catch (error: any) {
      console.error(`Error uploading ${fileType} file:`, error);
      toast({
        title: "Upload Error",
        description: error.message || `Failed to upload ${fileType} file`,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      value={field.value} 
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                        <SelectItem value="Web Development">Web Development</SelectItem>
                        <SelectItem value="Mobile Apps">Mobile Apps</SelectItem>
                        <SelectItem value="Blockchain">Blockchain</SelectItem>
                        <SelectItem value="IoT Projects">IoT Projects</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Project description" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Price</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        placeholder="0.00" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="ui_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UI Price</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        placeholder="0.00" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="code_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code Price</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        placeholder="0.00" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="documentation_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documentation Price</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        placeholder="0.00" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <FormLabel>Project Image</FormLabel>
                <div className="mt-2">
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                      <Upload className="ml-2 h-4 w-4" />
                    </Button>
                    {imagePreview && (
                      <div className="w-20 h-20 relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <FormLabel>UI Files</FormLabel>
                  <div className="mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('ui-upload')?.click()}
                      disabled={uploadingUI}
                      className="w-full"
                    >
                      {uploadingUI ? 'Uploading...' : 'Upload UI Files'}
                      <Upload className="ml-2 h-4 w-4" />
                    </Button>
                    {uiFileName && (
                      <p className="text-sm text-gray-500 mt-1 truncate">{uiFileName}</p>
                    )}
                    <input
                      id="ui-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'ui', setUploadingUI, setUiFileName)}
                    />
                  </div>
                </div>
                
                <div>
                  <FormLabel>Code Files</FormLabel>
                  <div className="mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('code-upload')?.click()}
                      disabled={uploadingCode}
                      className="w-full"
                    >
                      {uploadingCode ? 'Uploading...' : 'Upload Code Files'}
                      <Upload className="ml-2 h-4 w-4" />
                    </Button>
                    {codeFileName && (
                      <p className="text-sm text-gray-500 mt-1 truncate">{codeFileName}</p>
                    )}
                    <input
                      id="code-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'code', setUploadingCode, setCodeFileName)}
                    />
                  </div>
                </div>
                
                <div>
                  <FormLabel>Documentation Files</FormLabel>
                  <div className="mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('docs-upload')?.click()}
                      disabled={uploadingDocs}
                      className="w-full"
                    >
                      {uploadingDocs ? 'Uploading...' : 'Upload Documentation'}
                      <Upload className="ml-2 h-4 w-4" />
                    </Button>
                    {docsFileName && (
                      <p className="text-sm text-gray-500 mt-1 truncate">{docsFileName}</p>
                    )}
                    <input
                      id="docs-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'documentation', setUploadingDocs, setDocsFileName)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AdminProjectForm;
