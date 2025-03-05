import { useFormContext } from "react-hook-form";
import { TabWrapper } from "./TabWrapper";

export function TabFive() {
  const { watch } = useFormContext();
  const values = watch();

  const keys = Object.keys(values);
  const value = Object.values(values);

  return (
    <TabWrapper title="Preview">
      {/* Image Preview */}
      {values.photo instanceof File ? (
        <div className="flex justify-center">
          <img
            src={URL.createObjectURL(values.photo)}
            alt="Uploaded Preview"
            className="object-cover shadow max-h-60 w-full"
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <img
            src={"https://placehold.co/600x400?text=Preview"}
            alt="Uploaded Preview"
            className="object-cover shadow max-h-60 w-full"
          />
        </div>
      )}

      {/* Data Preview */}
      <div className="flex flex-col gap-2 p-4 rounded-md border border-gray-200">
        {keys.map((key, index) => (
          <div key={key} className="flex  py-1 border-b last:border-none">
            <span className="font-medium text-gray-700 capitalize">{key}</span>
            <span className="text-gray-600">
              : {typeof value[index] === "string" ? value[index] : "—"}
            </span>
          </div>
        ))}
      </div>
    </TabWrapper>
  );
}
