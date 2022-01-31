import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {ExpandMore as ExpandMoreIcon, NoEncryption} from '@material-ui/icons';

interface Expandprop {
  taskDescriptionTitle: string;
  taskDescription: string;
}


const Expand: React.FC<Expandprop> = (props: Expandprop) => {
   
    return (
        <div>
      <Accordion
        sx={{
          width: 400,
          boxShadow: "none",

        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <strong>{props.taskDescriptionTitle}</strong>
        </AccordionSummary>
        <AccordionDetails>
          {props.taskDescription}  
        </AccordionDetails>
      </Accordion>
    </div>
        
    )
};

export default Expand;



