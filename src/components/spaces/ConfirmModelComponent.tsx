import {Component} from "react";
import './ConfirmModelComponent.css';

interface ConfirmModalComponentProps {
    show: boolean
    title: string
    message: string
    confirmReservation: () => void
}

export class ConfirmModalComponent extends Component<ConfirmModalComponentProps>{

    render() {
        if (this.props.show){
            return <div className='modal'>
                <div className='modalContent'>
                   <h2>{this.props.title}</h2>
                    <h3 className='modalText'>{this.props.message}</h3>
                    <button onClick={()=>this.props.confirmReservation()}>Confirm Reservation</button>
                </div>
            </div>
        }else{
            return null;
        }
    }

}