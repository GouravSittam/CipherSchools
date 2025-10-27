"use client";

import { useState, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { ProjectService } from "../lib/services/projectService";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  FileCode,
  FolderOpen,
  Plus,
  Save,
  Download,
  Upload,
  Moon,
  Sun,
  Play,
  Settings,
  Trash2,
  FileText,
  Code,
  MoreVertical,
  Edit,
  FolderPlus,
  Keyboard,
  Github,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  files: Record<string, string>;
  activeFile?: string;
  autoSave?: boolean;
}

const defaultProjects: Project[] = [
  {
    id: "default",
    name: "Hello World",
    files: {
      "/App.js": `export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Welcome to CipherStudio 🚀</h1>
      <p>Start editing to see changes in real-time!</p>
    </div>
  );
}`,
      "/styles.css": `body {
  margin: 0;
  padding: 0;
  background: #f5f5f5;
}`,
    },
    activeFile: "/App.js",
    autoSave: true,
  },
  {
    id: "counter",
    name: "Counter App",
    files: {
      "/App.js": `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'system-ui' }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)} style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px', cursor: 'pointer' }}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Decrement
      </button>
    </div>
  );
}`,
      "/styles.css": `body {
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}`,
    },
    activeFile: "/App.js",
    autoSave: true,
  },
];

export default function CipherStudio() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [currentProjectId, setCurrentProjectId] = useState("default");
  const [newFileName, setNewFileName] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [importData, setImportData] = useState("");
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [renameFile, setRenameFile] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const currentProject = projects.find((p) => p.id === currentProjectId) || projects[0];

  const loadProjects = async () => {
    try {
      console.log("📡 Loading projects from MongoDB...");
      const loadedProjects = await ProjectService.getProjects();
      if (loadedProjects.length > 0) {
        setProjects(loadedProjects);
        console.log(`✅ Loaded ${loadedProjects.length} projects from database`);
      } else {
        console.log("📝 No projects found in database, using default projects");
      }
    } catch (error) {
      console.error("❌ Failed to load projects from database:", error);
      console.log("🔄 Falling back to localStorage...");
      // Fallback to localStorage if database fails
      const saved = localStorage.getItem("cipherstudio-projects");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProjects(parsed);
          console.log("✅ Loaded projects from localStorage fallback");
        } catch (e) {
          console.error("❌ Failed to load projects from localStorage", e);
        }
      }
    }
  };

  const saveProjects = async () => {
    try {
      // Save each project individually to MongoDB
      for (const project of projects) {
        try {
          // First try to update the project
          try {
            await ProjectService.updateProject(project.id, {
              name: project.name,
              files: project.files,
              activeFile: project.activeFile,
              autoSave: project.autoSave,
            });
            console.log(`✅ Updated project ${project.name} in database`);
          } catch (updateError: any) {
            // If update fails because project doesn't exist, create the project
            if (updateError.message === 'PROJECT_NOT_FOUND') {
              console.log(`📝 Project ${project.name} not found, creating new project...`);
              await ProjectService.createProject({
                name: project.name,
                files: project.files,
                activeFile: project.activeFile,
                autoSave: project.autoSave,
              });
              console.log(`✅ Created project ${project.name} in database`);
            } else {
              throw updateError; // Re-throw if it's a different error
            }
          }
        } catch (error) {
          console.error(`❌ Failed to save project ${project.name}:`, error);
        }
      }
    } catch (error) {
      console.error("❌ Failed to save projects to database:", error);
      // Fallback to localStorage
      localStorage.setItem("cipherstudio-projects", JSON.stringify(projects));
    }
  };

  useEffect(() => {
    setMounted(true);
    // Load projects from MongoDB
    loadProjects();

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S to save (already auto-saves, but show toast)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        toast.success("Project saved automatically!");
      }
      // Ctrl/Cmd + K to show shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsShortcutsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (mounted && currentProject?.autoSave !== false) {
      // Auto-save projects to MongoDB
      saveProjects();
    }
  }, [projects, mounted, currentProject?.autoSave]);

  const createNewFile = () => {
    if (!newFileName) return;

    const fileName = newFileName.startsWith("/") ? newFileName : `/${newFileName}`;

    // Check if file already exists
    if (currentProject.files[fileName]) {
      toast.error("File already exists!");
      return;
    }

    setProjects((prev) =>
      prev.map((p) =>
        p.id === currentProjectId
          ? {
            ...p,
            files: {
              ...p.files,
              [fileName]: "",
            },
          }
          : p
      )
    );
    setNewFileName("");
    setIsFileDialogOpen(false);
    toast.success(`File ${fileName} created!`);
  };

  const createNewFolder = () => {
    if (!newFileName) return;

    const folderName = newFileName.startsWith("/") ? newFileName : `/${newFileName}`;
    const indexFile = `${folderName}/index.js`;

    // Check if folder already exists
    const folderExists = Object.keys(currentProject.files).some(file => file.startsWith(folderName));
    if (folderExists) {
      toast.error("Folder already exists!");
      return;
    }

    setProjects((prev) =>
      prev.map((p) =>
        p.id === currentProjectId
          ? {
            ...p,
            files: {
              ...p.files,
              [indexFile]: `// ${folderName} folder\n`,
            },
          }
          : p
      )
    );
    setNewFileName("");
    setIsFolderDialogOpen(false);
    toast.success(`Folder ${folderName} created!`);
  };

  const createNewProject = async () => {
    if (!newProjectName) return;

    try {
      const newProject = await ProjectService.createProject({
        name: newProjectName,
        files: {
          "/App.js": `export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>${newProjectName}</h1>
      <p>Start building your React app here!</p>
    </div>
  );
}`,
          "/styles.css": `body {
  margin: 0;
  padding: 20px;
  font-family: system-ui, -apple-system, sans-serif;
}`,
        },
        activeFile: "/App.js",
        autoSave: true,
      });

      setProjects((prev) => [...prev, newProject]);
      setCurrentProjectId(newProject.id);
      setNewProjectName("");
      setIsProjectDialogOpen(false);
      toast.success(`Project "${newProjectName}" created!`);
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("Failed to create project. Please try again.");
    }
  };

  const deleteFile = (fileName: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === currentProjectId
          ? {
            ...p,
            files: Object.fromEntries(
              Object.entries(p.files).filter(([key]) => key !== fileName)
            ),
          }
          : p
      )
    );
    toast.success(`File ${fileName} deleted!`);
  };

  const renameFileAction = () => {
    if (!renameFile || !renameValue) return;

    const newFileName = renameValue.startsWith("/") ? renameValue : `/${renameValue}`;

    // Check if new name already exists
    if (currentProject.files[newFileName]) {
      toast.error("File with this name already exists!");
      return;
    }

    setProjects((prev) =>
      prev.map((p) =>
        p.id === currentProjectId
          ? {
            ...p,
            files: Object.fromEntries(
              Object.entries(p.files).map(([key, value]) =>
                key === renameFile ? [newFileName, value] : [key, value]
              )
            ),
            activeFile: p.activeFile === renameFile ? newFileName : p.activeFile,
          }
          : p
      )
    );

    toast.success(`File renamed to ${newFileName}`);
    setRenameFile(null);
    setRenameValue("");
    setIsRenameDialogOpen(false);
  };

  const openRenameDialog = (fileName: string) => {
    setRenameFile(fileName);
    setRenameValue(fileName);
    setIsRenameDialogOpen(true);
  };

  const deleteProject = async () => {
    if (projects.length <= 1) {
      toast.error("Cannot delete the last project");
      return;
    }

    try {
      await ProjectService.deleteProject(currentProjectId);
      const projectName = currentProject.name;
      setProjects((prev) => prev.filter((p) => p.id !== currentProjectId));
      setCurrentProjectId(projects[0].id === currentProjectId ? projects[1].id : projects[0].id);
      toast.success(`Project "${projectName}" deleted!`);
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project. Please try again.");
    }
  };

  const exportProject = () => {
    const dataStr = JSON.stringify(currentProject, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${currentProject.name}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    toast.success(`Project "${currentProject.name}" exported!`);
  };

  const importProject = () => {
    try {
      const parsed = JSON.parse(importData);
      const newProject: Project = {
        ...parsed,
        id: Date.now().toString(),
        autoSave: parsed.autoSave ?? true,
      };
      setProjects((prev) => [...prev, newProject]);
      setCurrentProjectId(newProject.id);
      setImportData("");
      setIsImportDialogOpen(false);
      toast.success(`Project "${newProject.name}" imported!`);
    } catch (e) {
      toast.error("Invalid project data. Please check the JSON format.");
    }
  };

  const toggleAutoSave = (enabled: boolean) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === currentProjectId
          ? { ...p, autoSave: enabled }
          : p
      )
    );
    toast.success(enabled ? "Auto-save enabled" : "Auto-save disabled");
  };

  const manualSave = async () => {
    try {
      await saveProjects();
      toast.success("Project saved manually!");
    } catch (error) {
      console.error("Failed to save project:", error);
      toast.error("Failed to save project. Please try again.");
    }
  };

  if (!mounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading CipherStudio...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      {/* Toolbar */}
      <div className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur px-2 sm:px-4 py-2 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              CipherStudio
            </h1>
          </div>

          <Select value={currentProjectId} onValueChange={setCurrentProjectId}>
            <SelectTrigger className="w-[150px] sm:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">New Project</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Enter a name for your new project</DialogDescription>
              </DialogHeader>
              <Input
                placeholder="Project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createNewProject()}
              />
              <DialogFooter>
                <Button onClick={createNewProject}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">New</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsFileDialogOpen(true)}>
                <FileText className="w-4 h-4 mr-2" />
                New File
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsFolderDialogOpen(true)}>
                <FolderPlus className="w-4 h-4 mr-2" />
                New Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" onClick={exportProject}>
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Import</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Project</DialogTitle>
                <DialogDescription>Paste your project JSON data</DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder='{"name": "My Project", "files": {...}}'
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                rows={10}
              />
              <DialogFooter>
                <Button onClick={importProject}>Import</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a
              href="https://github.com/GouravSittam"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Github className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsShortcutsOpen(true)}>
                <Keyboard className="w-4 h-4 mr-2" />
                Keyboard Shortcuts
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={deleteProject} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main IDE Area */}
      <div className="flex-1 h-0 overflow-hidden">
        <div className="h-full min-h-0">
          <SandpackProvider
            key={currentProjectId}
            template="react"
            files={currentProject.files}
            theme={theme === "dark" ? "dark" : "light"}
            options={{
              activeFile: currentProject.activeFile,
            }}
            className="h-full"
            style={{ height: "100%" }}
          >
            <SandpackLayout className="!h-full !border-0" style={{ height: "100%" }}>
              <div className="relative h-full min-h-0">
                <SandpackFileExplorer className="!h-full !min-h-0 !min-w-[200px] sm:!min-w-[250px]" />
                {/* File context menu - simplified for now */}
              </div>
              <SandpackCodeEditor className="!h-full !min-h-0" style={{ height: "100%" }} showTabs showLineNumbers />
              <SandpackPreview
                className="!h-full !min-h-0"
                style={{ height: "100%" }}
                showOpenInCodeSandbox={false}
                showRefreshButton={true}
              />
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </div>

      {/* Author Attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors z-10">
        Made by <a
          href="https://www.linkedin.com/in/GouravSittam/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:text-blue-400 transition-colors cursor-pointer"
        >
          Gourav Chaudhary❤️
        </a>
      </div>

      {/* File Dialog */}
      <Dialog open={isFileDialogOpen} onOpenChange={setIsFileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Enter a filename (e.g., /utils.js, /components/Button.jsx)
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="/filename.js"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createNewFile()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFileDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createNewFile}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Folder Dialog */}
      <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a folder name (e.g., /components, /utils)
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="/foldername"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createNewFolder()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFolderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createNewFolder}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
            <DialogDescription>Enter a new name for the file</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="/newname.js"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && renameFileAction()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={renameFileAction}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Configure your IDE preferences</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-save</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save changes to localStorage
                </p>
              </div>
              <Switch
                checked={currentProject?.autoSave !== false}
                onCheckedChange={toggleAutoSave}
              />
            </div>
            {currentProject?.autoSave === false && (
              <Button onClick={manualSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Manually
              </Button>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsSettingsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Keyboard Shortcuts Dialog */}
      <Dialog open={isShortcutsOpen} onOpenChange={setIsShortcutsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
            <DialogDescription>Quick access to common actions</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Save Project</span>
              <kbd className="px-2 py-1 text-xs font-semibold border rounded bg-muted">
                Ctrl + S
              </kbd>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Show Shortcuts</span>
              <kbd className="px-2 py-1 text-xs font-semibold border rounded bg-muted">
                Ctrl + K
              </kbd>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Toggle Theme</span>
              <span className="text-sm text-muted-foreground">Use theme button in toolbar</span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsShortcutsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}