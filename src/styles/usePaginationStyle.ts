import { makeStyles, tokens } from "@fluentui/react-components";

export const usePaginationStyle = makeStyles({
    wrapper: {
        columnGap: "0.2rem",
        display: "flex",
        alignItems: "center" 
    },
    pageBtn: {         
        minWidth: "1.3rem",
        alignContent: "center",
        alignItems : "center" 
    },
    pageSelectionWrapper: {   
        minWidth:"3rem"
    },
    pageSelectionDropdown: {   
        minWidth: "100%"
    },
    
});