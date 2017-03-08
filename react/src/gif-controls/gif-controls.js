/**
 * Created by Valetery on 3/3/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';

//working on sliders from library: 
// https://www.npmjs.com/package/react-bootstrap-slider
class gifControls extends React.Component {

    constructor(props) {
        super(props);
        this.valueChanged = this.valueChanged.bind(this);
    }
    render() {
        return (
            <Panel collapsible defaultExpanded header="Control Panel">
                Control Panel
            <ListGroup fill>
                    <ListGroupItem>
                        <ReactBootstrapSlider
                            value="3"
                            step={this.valueChanged}
                            max="10"
                            min="0"
                            orientation="vertical"
                            reversed="true" />
                    </ListGroupItem>
                </ListGroup>
         
        </Panel>
        );
    }

    valueChanged(event) {
        this.props.onChange(this.props.value, event.target.value);
    }

}

export default connect()(gifControls);
