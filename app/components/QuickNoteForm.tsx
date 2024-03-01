import {
  Modal,
  Input,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";

interface SimpleNoteFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickNoteForm = ({ isOpen, onClose }: SimpleNoteFormProps) => {
  return (
    <Modal
      backdrop="transparent"
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      disableAnimation={true}
      placement="center"
    >
      <ModalContent className="p-3 w-full">
        <form>
          <ModalHeader className="flex flex-col gap-1">
            <Input type="text" label="Title" size="sm" />
          </ModalHeader>
          <ModalBody
            className="w-full overflow-auto"
            style={{ maxHeight: "500px" }}
          >
            <Textarea fullWidth label="Quick Note" minRows={20} maxRows={100} />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="bordered" onPress={onClose}>
              Close
            </Button>
            <Button type="submit" color="primary">
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default QuickNoteForm;
