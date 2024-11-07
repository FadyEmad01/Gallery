"use client";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CloudUpload,
  LoaderCircle,
  X,
  //  Paperclip
} from "lucide-react";
import {
  FileInput,
  FileUploader,
  //   FileUploaderContent,
  //   FileUploaderItem,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { fetchProfile, postBoard } from "@/lib/api";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  boardImageInput: z.string(),
  BoardName: z.string().min(2),
  boardDescription: z.string().min(2),
  boardPrice: z.string().min(1).max(5),
});
interface user {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  // boards: Board[]; // Array of Board objects (defined later)
  profile_picture?: string; // Optional user profile picture URL (replace with the actual field name if available)
}

export default function CreateBoardPage() {
  const [user, setUser] = useState<user | null>(null); // State for user profile
  const [loading, setLoading] = useState(false); // Loading state
  const { toast } = useToast();
  const [files, setFiles] = useState<File[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetchProfile();
      if (response.success) {
        setUser(response.user); // Set user data from API
      } else {
        // setError(response.message); // Set error message
        console.log("Profile error: " + response.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred." + response.message,
        });
      }
      // setLoading(false); // Set loading to false
    };

    getProfile();
  }, []);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  function handleFileChange(newFiles: File[] | null) {
    setFiles(newFiles);
    form.setValue("boardImageInput", newFiles?.length ? "imageUploaded" : ""); // Set or clear value
    form.trigger("boardImageInput"); // Trigger validation
  }

  function removeImage() {
    setFiles(null);
    form.setValue("boardImageInput", ""); // Clear value on deletion
    form.trigger("boardImageInput"); // Re-trigger validation
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
//   const {
//     formState: { isValid },
//   } = form;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      if (!files || files.length === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please upload an image before submitting.",
        });
        return;
      }
      const formData = new FormData();
      formData.append("name", values.BoardName);
      formData.append("description", values.boardDescription);
      formData.append("price", values.boardPrice);
      formData.append("image", files[0]); // Append the image file

      const response = await postBoard(formData); // Send formData to the API
      if (response.success) {
        setLoading(false);
        toast({
          variant: "default",
          title: "Success",
          description: "Board created successfully.",
        });
        router.push('/profile');
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "Failed to create board. Please try again." + response.message,
        });
      }

    } catch (error) {
      setLoading(false);
      console.error("Form submission error", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit the form. Please try again." + error,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Toaster />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              {user?.name}
            </span>{" "}
            to Create a New Board
          </h1>
        </div>
        <Separator />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="boardImageInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board Image</FormLabel>
                <FormControl>
                  {files && files.length > 0 ? (
                    // Disabled upload area when an image is already uploaded

                    <div className="relative w-[200px]">
                      <Image
                        width={200}
                        height={0}
                        src={URL.createObjectURL(files[0])}
                        alt="Preview"
                        className="rounded-md mt-4"
                      />
                      <Button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-0 py-0 h-auto bg-red-500 text-white rounded-full"
                      >
                        <X />
                      </Button>
                    </div>
                  ) : (
                    // FileUploader component for uploading images
                    <FileUploader
                      {...field}
                      value={files}
                      onValueChange={handleFileChange}
                      dropzoneOptions={dropZoneConfig}
                      className="relative bg-background rounded-lg p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex items-center justify-center flex-col p-8 w-full ">
                          <CloudUpload className="text-gray-500 w-10 h-10" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400 text-center">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                    </FileUploader>
                  )}
                </FormControl>
                <FormDescription>Select an image to upload.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="BoardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Board Name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your Board name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="boardDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Board Description"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your Board Description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="boardPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Board Price"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your Board Price.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button disabled={!isValid} type="submit">
            Submit
          </Button> */}
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {loading ? "Creating..." : "Create Board"}
          </Button>
        </form>
      </Form>
    </Container>
  );
}
