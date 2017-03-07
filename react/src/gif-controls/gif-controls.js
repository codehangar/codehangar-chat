/**
 * Created by Valetery on 3/3/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

const gifControls = () => {
    return (
        <Panel collapsible defaultExpanded header="Control Panel">
            Control Panel
            <ListGroup fill>
                <ListGroupItem>Item 1</ListGroupItem>
                <ListGroupItem>Item 2</ListGroupItem>
                <ListGroupItem>&hellip;</ListGroupItem>
            </ListGroup>
            Some more panel content here.
        </Panel>
    );
};

export default connect()(gifControls);
