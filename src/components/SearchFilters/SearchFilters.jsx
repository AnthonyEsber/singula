import styles from './SearchFilters.module.css';

function SearchFilters() {
  return (
    <div className={styles.formContainer}>
      <form>
        <input type="text" placeholder="Search by resume name" />

        <div className={styles.sortControls}>
          <span>NAME</span>
          <span>DATE</span>
        </div>
      </form>
    </div>
  );
}

export default SearchFilters;
