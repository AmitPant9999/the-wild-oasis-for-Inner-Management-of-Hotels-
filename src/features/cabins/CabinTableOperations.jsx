import TableOperations from "../../ui/TableOperations";

import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter   filterField="discount" options={[{value:"all",label:"All" },{value:'with-discount',label:"With-Discount"},{value:"no-discount",label:"No-Discount"}]} />
            <SortBy  options={[{value:'name-asc',label:'Sort By A-Z'},{value:"name-dsc",label:"Sort by Z-A"},{value:"regularPrice-asc", label:"price-low-to-high "},{value:"regularPrice-dsc",label:"price-high-to-low"},{value:"maxCapacity-asc",label:'sort by maxCapcity(low-first)'},{value:"maxCapacity-dsc",label:'sort by maxcapacity(high first)'} ]}/>

        </TableOperations>
    )
}

export default CabinTableOperations;
