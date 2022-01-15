import React, { Component }from "react"
import Aux from '../Auxillary/Auxillary'
import Modal from "../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent , axios) => {
    return class extends Component {
        constructor(props){
            super()
            this.state={
                error: null
            }
        }
        componentWillMount(){
            this.reqInterceptop = axios.interceptors.request.use(req =>{
                this.setState({error : null})
                return req;
            })
            this.resInterceptop = axios.interceptors.response.use(res => res, error =>{
                this.setState({error : error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptop);
            axios.interceptors.response.eject(this.resInterceptop);
        }
        errorConfirmedHandler = () => {
            this.setState({error : null})
        }
        render(){
            return(
                    <Aux>
                        <Modal 
                            show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}>
                            {this.state.error?this.state.error.message:null}
                        </Modal>
                        <WrappedComponent {...this.props}/>
                    </Aux>
                )
        }
    }
}

export default withErrorHandler