import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {ExpandMore as ExpandMoreIcon} from '@material-ui/icons';

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
          aria-controls="task-content" // For optimal accessibility it is recommended setting id and aria-controls on the AccordionSummary. 
          id="task-header"// The Accordion will derive the necessary aria-labelledby and id for the content region of the accordion.
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



