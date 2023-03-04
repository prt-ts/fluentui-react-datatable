import { makeStyles } from "@fluentui/react-components";

export const useHeaderCellStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent : "center",
        alignItems : "center",
        width: "100%",
        cursor: "pointer",
        paddingTop : "5px",
        paddingBottom : "5px"
    },
    sortIcon: {
        alignContent: "center",
        alignItems: "start",
        marginRight: "5px"
    },
    headerLable: {},
    overlayIcon: {},
    rowSelectCell: {
        width : "30px"
    }
});