import styles from '../../styles/components/common/input.module.css';

export default function Input({ type, name, value, onChange, placeholder, ...props }) {
    return (    
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={styles.inputField}
            {...props}
        />
    );
}