import styled from "styled-components";

const MyTable = styled.table`
    margin: 2em;
    border-radius: 1em;
`

const Thead = styled.thead`
    color: #ffffff;

    & > tr > th {
    background-color: #aab3fd;
    border-radius: 1em;
    padding: 0.5em;  
    }
`

const Tbody = styled.tbody`
    color: #aab3fd;
  
    & > tr > th {
        border: #808080 solid 0.01em;  
        border-radius: 1em;
        padding: 1em;
        width: 100em;
    }

    & > button {
        height: 3em;
        width: 10em;
        background-color: #aab3fd;
        border: none;
        border-radius: 1em;
        color: #ffffff;
      
        &:hover {
            background-color: #ff97f7;
        }
    }

    & > div > ul {
      background-color: #ffffff;
      border-radius: 1em;
      color: #aab3fd;
    }


    & > div > ul >li:hover {
        background-color: #ff97f7;
        color: #ffffff;
    }
`

function Table({ columns, data}: any) {
    return (
        <MyTable>
            <Thead>
                {columns}
            </Thead>
            <Tbody>
                {data}
            </Tbody>
        </MyTable>
    );
}

export default Table;