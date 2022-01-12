import {Component} from "react";
import genericImage from '../../assets/image-not-found.jpeg';
import './SpaceComponent.css';

interface SpaceComponentProps {
    spaceId: string
    name: string
    location: string
    imageUrl?: string
    reserveSpace: (spaceId: string) => void
}


export class SpaceComponent extends Component<SpaceComponentProps>{

    private renderImage(){
        if (this.props.imageUrl){
            return <img className="spaceImage" src={this.props.imageUrl} alt='Property img' />
        }else{
            return <img className="spaceImage" src={genericImage} alt='Property img'  />
        }
    }

    render(){
        return <div className="spaceComponent" >
                {this.renderImage()}<br/>
                <label className="name">{this.props.name}</label><br/>
                <label className="spaceId">{this.props.spaceId}</label><br/>
                <label className="location">{this.props.location}</label><br/>
                <button onClick={()=>this.props.reserveSpace(this.props.spaceId)}>Reserve</button>
            </div>
    }

}