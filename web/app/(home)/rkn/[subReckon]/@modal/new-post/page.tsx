import Modal from "@/components/modal/modal";
import NewPostForm from "@/components/new-post-form";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Page({
    params,
  }: {
    params: { subReckon: string };
  }) {
  return (
    <Modal title="New post">
        <NewPostForm subReckonName={params.subReckon}></NewPostForm>
    </Modal>
  );
}
