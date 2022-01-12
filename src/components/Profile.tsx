import React from "react";
import{UserAttribute,  User} from "../model/Model";
import {AuthService} from "../services/AuthService";
import {Link} from "react-router-dom";

interface ProfileState {
    userAttributes: UserAttribute[]
}
interface ProfileProps {
    user: User | undefined
    authService: AuthService
}

export class Profile extends React.Component<ProfileProps,ProfileState> {

    state: ProfileState = {
        userAttributes:[]
    }

    async componentDidMount() {
        if (this.props.user){
            const userAttrs = await this.props.authService.getUserAttributes(this.props.user);
            this.setState({userAttributes: userAttrs});
        }
    }

    private renderUserAttributes(){
        const rows = [];
        for (const userAttribute of this.state.userAttributes) {
            rows.push(<tr key={userAttribute.name}>
                        <td>{userAttribute.name}</td><td>{userAttribute.value}</td>
                       </tr>
            );
        }
        return <table>
            <tbody>
                {rows}
            </tbody>
        </table>;
    }

    render(){

        let profileSpace
        if (this.props.user){
            profileSpace =
                <div>
                <h3> Hello {this.props.user.userName}</h3>
                    {this.renderUserAttributes()}
                </div>
        }else{
            profileSpace = <div>
                <Link to={"/login"} > Please login </Link>
            </div>
        }

        return (
            <div>
                Welcome to the profile page!
                {profileSpace}
            </div>
        )
    }

}