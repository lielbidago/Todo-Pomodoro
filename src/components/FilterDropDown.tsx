import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function FilterDropDown({handleFilterTodos, FilterDropDownRef}) {
  
  
    return (
    <>
      <div className="mb-2 filter" ref={FilterDropDownRef}>
            <DropdownButton
              key={'end'}
              id={`dropdown-button-drop-end`}
              drop={'end'}
              variant="dark-outline"
              size='sm'
              title={<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg>}
            >
              <Dropdown.Item eventKey="all" onClick={()=>handleFilterTodos('all')}>Show all</Dropdown.Item>
              <Dropdown.Item eventKey="completed" onClick={()=>handleFilterTodos('completed')}>Show completed</Dropdown.Item>
              <Dropdown.Item eventKey="noncompleted" onClick={()=>handleFilterTodos('noncompleted')}>Show non-completed</Dropdown.Item>
            </DropdownButton>
      </div>
    </>
  );
}

