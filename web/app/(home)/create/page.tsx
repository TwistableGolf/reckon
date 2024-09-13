import { ProtectedPage } from "@/components/protected-page";
import CreateSubreckonForm from "@/components/subrkn/create-subreckon-form";

function Page() {
    return (
        <CreateSubreckonForm></CreateSubreckonForm>
    );
}

export default await ProtectedPage(Page);