import ResumeItemsGrid from '../ResumeItemsGrid/ResumeItemsGrid';
import SearchFilters from '../SearchFilters/SearchFilters';

function FilterableResumeGrid() {
  return (
    <>
      <SearchFilters />
      <ResumeItemsGrid />
    </>
  );
}

export default FilterableResumeGrid;
