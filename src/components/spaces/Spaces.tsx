import {Component} from "react";
import {Space} from "../../model/Model";
import {DataService} from "../../services/DataService";
import {SpaceComponent} from "./SpaceComponent";
import {ConfirmModalComponent} from "./ConfirmModelComponent";

interface SpacesState {
    spaces: Space[]
    showModal: boolean
    modalContent: string
    modalTitle: string
}

interface SpacesProps {
    dataService: DataService
}

export class Spaces extends Component<SpacesProps, SpacesState>{

    constructor(props: SpacesProps) {
        super(props);
        this.state = {
            spaces: [],
            showModal: false,
            modalContent: '',
            modalTitle: ''
        }
        this.reserveSpace = this.reserveSpace.bind(this);
        this.confirmReservation = this.confirmReservation.bind(this);
    }

    async componentDidMount() {
        const spaces = await this.props.dataService.getSpaces();
        this.setState({spaces: spaces});
    }

    private async reserveSpace(spaceId:string){
        const reservationResult = await this.props.dataService.reserveSpace(spaceId);
        if (reservationResult){
            this.setState({
                showModal: true,
                modalContent: `You reserved the space with id ${spaceId} with reservation number ${reservationResult}`,
                modalTitle: 'Success Reservation'
            })
        }else{
            this.setState({
                showModal: true,
                modalContent: `Unable to reserve the space with id ${spaceId}`,
                modalTitle: 'Something when wrong with your Reservation'
            })
        }
    }

    private renderSpaces(){
        const rows: any[] = [];
        for (const space of this.state.spaces) {
            rows.push(
                <SpaceComponent key={space.spaceId}
                                spaceId={space.spaceId}
                                name={space.name}
                                location={space.location}
                                reserveSpace={this.reserveSpace} />
            )
        }
        return rows;
    }

    private confirmReservation(){
        this.setState({
            ...this.state,
            showModal: false,
            modalContent: ''
        });
    }

    render() {
        return <div>
            <h2>Welcome to our Spaces</h2>
            <div>
                {this.renderSpaces()}
            </div>
            <ConfirmModalComponent show={this.state.showModal}
                                   title={this.state.modalTitle}
                                   message={this.state.modalContent}
                                   confirmReservation={this.confirmReservation} />
        </div>

    }

}