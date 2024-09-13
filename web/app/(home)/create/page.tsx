import { ProtectedPage } from "@/components/protected-page";
import CreateSubreckonForm from "@/components/subrkn/create-subreckon-form";

function Page() {
  return (
    <div className="flex flex-col p-3 xl:mx-32 m-0 gap-4">
      <CreateSubreckonForm></CreateSubreckonForm>
    </div>
  );
}

export default await ProtectedPage(Page);
