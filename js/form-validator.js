const FormValidator = {
    rules: {
        customer_name: {
            required: true,
            minLength: 2,
            label: 'Tên doanh nghiệp / cá nhân',
            message: 'Vui lòng nhập tên (ít nhất 2 ký tự)'
        },
        contact_person: {
            required: true,
            minLength: 2,
            label: 'Người liên hệ',
            message: 'Vui lòng nhập tên người liên hệ'
        },
        tax_id: {
            required: true,
            pattern: /^\d{10,13}$/,
            label: 'Mã số thuế',
            message: 'MST phải gồm 10-13 chữ số'
        },
        phone: {
            required: true,
            pattern: /^0\d{8,10}$/,
            label: 'Số điện thoại',
            message: 'SĐT bắt đầu bằng 0, gồm 9-11 chữ số'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            label: 'Email',
            message: 'Email không hợp lệ'
        },
        address: {
            required: true,
            minLength: 5,
            label: 'Địa chỉ',
            message: 'Vui lòng nhập địa chỉ đầy đủ'
        },
        cccd: {
            required: true,
            pattern: /^\d{9}$|^\d{12}$/,
            label: 'CCCD/CMND',
            message: 'CCCD phải gồm 9 hoặc 12 chữ số'
        },
        cccd_date: {
            required: true,
            label: 'Ngày cấp',
            message: 'Vui lòng nhập ngày cấp',
            custom: (value) => {
                if (!value) return false;
                return new Date(value) <= new Date();
            },
            customMessage: 'Ngày cấp không được là ngày tương lai'
        }
    },

    validate: (fieldName, value) => {
        const rule = FormValidator.rules[fieldName];
        if (!rule) return { valid: true };

        if (rule.required && (!value || value.trim() === '')) {
            return { valid: false, message: rule.message };
        }
        if (rule.minLength && value.length < rule.minLength) {
            return { valid: false, message: rule.message };
        }
        if (rule.pattern && !rule.pattern.test(value)) {
            return { valid: false, message: rule.message };
        }
        if (rule.custom && !rule.custom(value)) {
            return { valid: false, message: rule.customMessage || rule.message };
        }
        return { valid: true };
    },

    validateForm: (formElement) => {
        const inputs = formElement.querySelectorAll('[data-validate]');
        let allValid = true;
        let firstInvalid = null;

        inputs.forEach(input => {
            const fieldName = input.getAttribute('data-validate');
            const result = FormValidator.validate(fieldName, input.value);
            const errorEl = input.parentElement.querySelector('.field-error');

            if (!result.valid) {
                input.classList.add('error');
                if (errorEl) errorEl.textContent = result.message;
                allValid = false;
                if (!firstInvalid) firstInvalid = input;
            } else {
                input.classList.remove('error');
                if (errorEl) errorEl.textContent = '';
            }
        });

        if (firstInvalid) firstInvalid.focus();
        return allValid;
    }
};
