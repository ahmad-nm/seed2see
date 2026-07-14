import styles from '../../styles/components/common/textArea.module.css';

export default function TextArea({ name, value, onChange, placeholder, ...props }) {
    return (    
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={styles.textAreaField}
            {...props}
        />
    );
}