import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm1";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
    return (
        <div>
        <Modal>
            <Modal.Open opens='cabin-form'> 
                <Button>Add new Cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm/>
            </Modal.Window>
        
    </Modal>
      </div>  
    )
}

export default AddCabin


/* function AddCabin() {
    const [showModal,setShowModal]=useState(false);
    return (
        <Row>
             <Button onClick={()=>setShowModal((show)=>!show)}>Add new Cabin</Button>
             {showModal &&<Modal onClose={()=>setShowModal(false)}><CreateCabinForm onModalClose={()=>setShowModal(false)}/></Modal>}
        </Row>
    )
}

export default AddCabin
 */