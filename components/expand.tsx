import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {ExpandMore as ExpandMoreIcon} from '@material-ui/icons';

interface Expandprop {
  DescriptionTitle: string;
  Description: string;
}


const Expand: React.FC<Expandprop> = (props: Expandprop) => {
   
    return (
        <div style={{ margin: "1rem"}}>
      <Accordion
        sx={{
          width: 600,
          boxShadow: "none",
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="task-content" // For optimal accessibility it is recommended setting id and aria-controls on the AccordionSummary. 
          id="task-header"// The Accordion will derive the necessary aria-labelledby and id for the content region of the accordion.
        >
          <strong>{props.DescriptionTitle}</strong>
        </AccordionSummary>
        <AccordionDetails>
          {props.Description}  
        </AccordionDetails>
      </Accordion>
    </div>
        
    )
};

export default Expand;



