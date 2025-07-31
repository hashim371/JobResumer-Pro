
import { cn } from "@/lib/utils";

interface TemplateThumbnailProps {
  templateId: string;
}

export const TemplateThumbnail = ({ templateId }: TemplateThumbnailProps) => {
  // Common styles for the thumbnail container
  const containerClasses = "w-full h-full p-6 flex flex-col";
  const barClasses = "h-2 rounded-sm mb-2";
  const smallBarClasses = "h-1.5 rounded-sm mb-1.5";
  const circleClasses = "rounded-full";

  switch (templateId) {
    case 'dublin':
      return (
        <div className={cn(containerClasses, 'bg-white')}>
          <div className="w-full h-12 bg-indigo-700 -m-6 mb-6" />
          <div className={cn(barClasses, "w-1/2 bg-gray-300")} />
          <div className={cn(barClasses, "w-full bg-gray-200")} />
          <div className={cn(barClasses, "w-full bg-gray-200")} />
          <div className="mt-auto grid grid-cols-2 gap-4">
            <div>
              <div className={cn(barClasses, "w-1/3 bg-gray-300")} />
              <div className={cn(smallBarClasses, "w-full bg-gray-200 mt-2")} />
              <div className={cn(smallBarClasses, "w-full bg-gray-200")} />
            </div>
            <div>
              <div className={cn(barClasses, "w-1/3 bg-gray-300")} />
              <div className="flex flex-wrap gap-1 mt-2">
                <div className="w-8 h-3 rounded-full bg-indigo-100" />
                <div className="w-10 h-3 rounded-full bg-indigo-100" />
                <div className="w-6 h-3 rounded-full bg-indigo-100" />
              </div>
            </div>
          </div>
        </div>
      );
    case 'new-york':
      return (
        <div className={cn(containerClasses, 'bg-white text-center font-serif')}>
            <div className={cn(barClasses, "w-1/2 bg-gray-400 mx-auto mb-1")} />
            <div className={cn(barClasses, "w-1/3 bg-gray-300 mx-auto")} />
            <div className="w-full h-px bg-gray-300 my-4" />
            <div className={cn(barClasses, "w-full bg-gray-200")} />
            <div className={cn(barClasses, "w-full bg-gray-200")} />
            <div className="mt-auto grid grid-cols-2 gap-4">
                <div>
                  <div className={cn(smallBarClasses, "w-full bg-gray-200")} />
                  <div className={cn(smallBarClasses, "w-3/4 bg-gray-200")} />
                </div>
                 <div>
                    <div className="flex flex-wrap gap-1 mt-2">
                        <div className="w-8 h-3 rounded bg-gray-200" />
                        <div className="w-10 h-3 rounded bg-gray-200" />
                        <div className="w-6 h-3 rounded bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
      );
    case 'berlin':
       return (
        <div className="w-full h-full flex bg-white">
            <div className="w-1/3 bg-gray-100 p-4 flex flex-col gap-4">
                <div className={cn(barClasses, "w-3/4 bg-gray-400 mx-auto")} />
                <div className={cn(barClasses, "w-1/2 bg-gray-300 mx-auto")} />
                <div className="space-y-1 mt-4">
                    <div className={cn(smallBarClasses, "w-full bg-gray-200")} />
                    <div className={cn(smallBarClasses, "w-full bg-gray-200")} />
                </div>
                <div className="mt-auto space-y-1">
                    <div className={cn(smallBarClasses, "w-full bg-gray-300 rounded-sm")} />
                    <div className={cn(smallBarClasses, "w-full bg-gray-300 rounded-sm")} />
                </div>
            </div>
            <div className="w-2/3 p-4 space-y-4">
                <div className={cn(barClasses, "w-full bg-gray-200")} />
                <div className={cn(barClasses, "w-full bg-gray-200")} />
                <div className={cn(barClasses, "w-3/4 bg-gray-200")} />
            </div>
        </div>
      );
    case 'london':
         return (
            <div className={cn(containerClasses, 'bg-white')}>
                <div className="flex justify-between">
                    <div className="w-1/2">
                        <div className={cn(barClasses, "w-full h-4 bg-blue-800")} />
                        <div className={cn(barClasses, "w-3/4 h-2 bg-gray-300 mt-1")} />
                    </div>
                    <div className="w-1/4 space-y-1">
                        <div className={cn(smallBarClasses, "w-full bg-gray-200")} />
                        <div className={cn(smallBarClasses, "w-full bg-gray-200")} />
                    </div>
                </div>
                <div className="w-full h-0.5 bg-blue-800 my-4" />
                <div className={cn(barClasses, "w-full bg-gray-200")} />
                <div className={cn(barClasses, "w-3/4 bg-gray-200")} />

                <div className="mt-auto">
                    <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-1 space-y-1">
                            <div className={cn(smallBarClasses, "w-full bg-gray-200")} />
                             <div className={cn(smallBarClasses, "w-full bg-gray-200")} />
                        </div>
                        <div className="col-span-3 space-y-1">
                            <div className={cn(smallBarClasses, "w-full bg-gray-300")} />
                             <div className={cn(smallBarClasses, "w-3/4 bg-gray-200")} />
                        </div>
                    </div>
                </div>
            </div>
        );
    default:
      // A generic fallback thumbnail
      return (
        <div className={cn(containerClasses, 'bg-white space-y-4')}>
          <div className="flex gap-4">
            <div className={cn(circleClasses, "w-12 h-12 bg-gray-300 flex-shrink-0")} />
            <div className="w-full space-y-2">
              <div className={cn(barClasses, "w-3/4 bg-gray-400")} />
              <div className={cn(barClasses, "w-1/2 bg-gray-300")} />
            </div>
          </div>
          <div className="space-y-2">
            <div className={cn(barClasses, "w-full bg-gray-200")} />
            <div className={cn(barClasses, "w-full bg-gray-200")} />
            <div className={cn(barClasses, "w-5/6 bg-gray-200")} />
          </div>
          <div className="flex-grow" />
           <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <div className={cn(barClasses, "w-1/3 bg-gray-300")} />
                <div className={cn(smallBarClasses, "w-full bg-gray-200")} />
                <div className={cn(smallBarClasses, "w-3/4 bg-gray-200")} />
            </div>
             <div className="space-y-2">
                <div className={cn(barClasses, "w-1/3 bg-gray-300")} />
                <div className="flex flex-wrap gap-1 mt-2">
                    <div className="w-8 h-3 rounded-full bg-gray-200" />
                    <div className="w-10 h-3 rounded-full bg-gray-200" />
                    <div className="w-6 h-3 rounded-full bg-gray-200" />
                </div>
            </div>
          </div>
        </div>
      );
  }
};
