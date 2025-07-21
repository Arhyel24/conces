import { toast } from "sonner";
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "loading";

const iconMap = {
  success: <CheckCircle className="text-green-500" size={20} />,
  error: <XCircle className="text-red-500" size={20} />,
  warning: <AlertTriangle className="text-yellow-500" size={20} />,
  loading: <Loader2 className="animate-spin text-blue-500" size={20} />,
};

export function showToast({
  type = "success",
  title,
  description,
}: {
  type?: ToastType;
  title: string;
  description?: string;
}) {
  toast.custom(
    () => (
      <div className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700 max-w-sm w-full">
        <div className="mt-1">{iconMap[type]}</div>
        <div className="flex flex-col">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </span>
          {description && (
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {description}
            </span>
          )}
        </div>
      </div>
    ),
    {
      duration: type === "loading" ? Infinity : 3000,
    }
  );
}
