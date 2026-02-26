import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, setSortBy, setSortDir, setShowPublicOnly } from '../../store/uiSlice';
import styles from './SearchFilters.module.css';

function SearchFilters() {
  const dispatch = useDispatch();
  const { searchText, sortBy, sortDir, showPublicOnly } = useSelector((s) => s.ui.resumeFilters);

  function handleSortClick(key) {
    if (sortBy === key) {
      dispatch(setSortDir(sortDir === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortBy(key));
      dispatch(setSortDir(key === 'name' ? 'asc' : 'desc'));
    }
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search by resume name"
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />

        <div className={styles.sortControls}>
          <button
            type="button"
            className={sortBy === 'name' ? styles.active : ''}
            onClick={() => handleSortClick('name')}
          >
            NAME {sortBy === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
          <button
            type="button"
            className={sortBy === 'date' ? styles.active : ''}
            onClick={() => handleSortClick('date')}
          >
            DATE {sortBy === 'date' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
          <button
            type="button"
            className={showPublicOnly ? styles.active : ''}
            onClick={() => dispatch(setShowPublicOnly(!showPublicOnly))}
          >
            PUBLIC
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchFilters;
