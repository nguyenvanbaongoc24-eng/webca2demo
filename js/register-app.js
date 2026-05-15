document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const product = PRODUCTS.find(p => p.slug === slug);

    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    StepController.clearData();

    // Read pricing page selections from sessionStorage
    const ssProduct = sessionStorage.getItem('selected_product');
    const ssPackage = sessionStorage.getItem('selected_package');
    const ssDoituong = sessionStorage.getItem('selected_doituong');

    StepController.saveData({
        productSlug: slug,
        package: params.get('package') || ssPackage || '',
        doituong: ssDoituong || ''
    });

    // Clean up sessionStorage after reading
    sessionStorage.removeItem('selected_product');
    sessionStorage.removeItem('selected_package');
    sessionStorage.removeItem('selected_doituong');

    const flow = getFlowConfig(product.flowType);
    const extraFields = getExtraFields(slug);
    let currentIdx = 0;

    document.title = `Đăng ký ${product.shortName || product.name} - Nacencomm`;
    document.getElementById('banner-icon').textContent = product.icon;
    document.getElementById('banner-name').textContent = product.name;
    document.getElementById('banner-tagline').textContent = product.tagline;
    document.getElementById('banner-group').textContent = `${product.group} • ${flowSummary(product.flowType)}`;

    const indicator = document.getElementById('step-indicator');
    flow.steps.forEach((step, index) => {
        const div = document.createElement('div');
        div.className = `step${index === 0 ? ' active' : ''}`;
        div.dataset.idx = index;
        div.innerHTML = `<div class="step-num">${index + 1}</div>${step.label}`;
        indicator.appendChild(div);
    });

    const body = document.getElementById('form-body');
    flow.steps.forEach((step, index) => {
        const section = document.createElement('section');
        section.className = `form-section${index === 0 ? ' active' : ''}`;
        section.dataset.idx = index;
        section.dataset.stepId = step.id;
        section.innerHTML = buildStepHTML(step.id, product, extraFields);
        body.appendChild(section);
    });

    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    hydratePresetPackage();
    updateButtons();

    nextBtn.addEventListener('click', () => {
        if (!validateCurrentStep()) return;
        saveCurrentData();
        if (currentIdx >= flow.steps.length - 1) {
            submitForm();
            return;
        }
        goTo(currentIdx + 1);
    });

    prevBtn.addEventListener('click', () => {
        if (currentIdx > 0) goTo(currentIdx - 1);
    });

    body.addEventListener('click', event => {
        const card = event.target.closest('.radio-card');
        if (card) {
            const grid = card.closest('.radio-card-grid');
            grid.querySelectorAll('.radio-card').forEach(item => item.classList.remove('selected'));
            card.classList.add('selected');
            card.querySelector('input[type="radio"]').checked = true;
        }

        const payment = event.target.closest('.payment-option');
        if (payment) {
            payment.closest('.payment-methods').querySelectorAll('.payment-option').forEach(item => item.classList.remove('selected'));
            payment.classList.add('selected');
            payment.querySelector('input[type="radio"]').checked = true;
        }

        const upload = event.target.closest('.upload-zone');
        if (upload) {
            upload.classList.toggle('uploaded');
            const name = upload.dataset.doc || 'Hồ sơ';
            upload.querySelector('.file-name').textContent = upload.classList.contains('uploaded') ? `${name}.pdf (đã tải)` : '';
        }
    });

    function goTo(index) {
        document.querySelectorAll('.form-section').forEach(section => section.classList.remove('active'));
        document.querySelector(`.form-section[data-idx="${index}"]`).classList.add('active');
        document.querySelectorAll('.step').forEach((step, i) => {
            step.classList.remove('active', 'done');
            if (i < index) step.classList.add('done');
            if (i === index) step.classList.add('active');
        });

        currentIdx = index;
        const stepId = flow.steps[index].id;
        if (['review', 'confirm', 'payment', 'contract', 'activate'].includes(stepId)) populateReview();
        updateButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateButtons() {
        const stepId = flow.steps[currentIdx].id;
        const isLast = currentIdx === flow.steps.length - 1;
        prevBtn.style.visibility = currentIdx === 0 ? 'hidden' : 'visible';

        if (stepId === 'payment') nextBtn.textContent = 'Xác nhận & thanh toán';
        else if (stepId === 'confirm') nextBtn.textContent = 'Gửi yêu cầu tư vấn';
        else if (stepId === 'contract') nextBtn.textContent = 'Đã ký hợp đồng';
        else if (stepId === 'activate') nextBtn.textContent = 'Kích hoạt dịch vụ';
        else if (isLast) nextBtn.textContent = 'Hoàn tất';
        else nextBtn.textContent = 'Tiếp theo →';
    }

    function validateCurrentStep() {
        const section = document.querySelector(`.form-section[data-idx="${currentIdx}"]`);
        let valid = true;

        section.querySelectorAll('[required]').forEach(input => {
            const errorEl = input.parentElement.querySelector('.field-error');
            const value = input.value.trim();

            if (input.dataset.validate) {
                const result = FormValidator.validate(input.dataset.validate, value);
                if (!result.valid) {
                    valid = false;
                    input.classList.add('error');
                    if (errorEl) errorEl.textContent = result.message;
                    return;
                }
            } else if (!value) {
                valid = false;
                input.classList.add('error');
                if (errorEl) errorEl.textContent = 'Trường này là bắt buộc';
                return;
            }

            input.classList.remove('error');
            if (errorEl) errorEl.textContent = '';
        });

        const stepId = section.dataset.stepId;
        if (stepId === 'package' && !section.querySelector('.radio-card.selected')) {
            valid = false;
            alert('Vui lòng chọn một gói cước.');
        }

        if (stepId === 'upload') {
            const missing = Array.from(section.querySelectorAll('.upload-zone')).filter(zone => !zone.classList.contains('uploaded'));
            if (missing.length) {
                valid = false;
                alert('Vui lòng tải đủ hồ sơ bắt buộc để tiếp tục.');
            }
        }

        return valid;
    }

    function saveCurrentData() {
        const section = document.querySelector(`.form-section[data-idx="${currentIdx}"]`);
        const data = {};

        section.querySelectorAll('input, select, textarea').forEach(input => {
            if (input.name) data[input.name] = input.value;
        });

        const selectedPackage = section.querySelector('.radio-card.selected input[name="package"]');
        if (selectedPackage) data.package = selectedPackage.value;

        const selectedPayment = section.querySelector('.payment-option.selected input[name="payment_method"]');
        if (selectedPayment) data.payment_method = selectedPayment.value;

        if (section.dataset.stepId === 'upload') {
            data.uploadedDocs = Array.from(section.querySelectorAll('.upload-zone.uploaded')).map(zone => zone.dataset.doc);
        }

        StepController.saveData(data);
    }

    function populateReview() {
        const data = StepController.getData();
        const review = document.getElementById('review-content');
        if (!review) return;

        const rows = [
            ['Sản phẩm', product.name],
            ['Luồng xử lý', flowSummary(product.flowType)],
            ['Gói đăng ký', data.package || 'Chưa chọn'],
            ['Tên DN / cá nhân', data.customer_name || ''],
            ['Mã số thuế', data.tax_id || ''],
            ['Người liên hệ', data.contact_person || ''],
            ['Số điện thoại', data.phone || ''],
            ['Email', data.email || ''],
            ['Địa chỉ', data.address || '']
        ];

        [
            ['Người ĐDPL', data.nguoi_ddpl],
            ['CCCD/CMND', data.cccd],
            ['Ngày cấp CCCD', data.cccd_date],
            ['Số nhân viên', data.so_nhan_vien],
            ['Số người dùng', data.so_nguoi_dung],
            ['Phần mềm hiện tại', data.phan_mem_cu || data.pm_ke_toan],
            ['Số hóa đơn/tháng', data.so_hoa_don],
            ['Quy mô hệ thống', data.quy_mo],
            ['Ngày khảo sát', data.ngay_khao_sat],
            ['Lĩnh vực', data.linh_vuc || data.linh_vuc_thau],
            ['Vấn đề hiện tại', data.van_de_hien_tai],
            ['Trường / tổ chức', data.truong_to_chuc],
            ['Số học viên', data.so_hoc_vien],
            ['Khóa học', data.khoa_hoc],
            ['Hồ sơ đã tải', Array.isArray(data.uploadedDocs) ? data.uploadedDocs.join(', ') : ''],
            ['Ghi chú', data.notes]
        ].forEach(([label, value]) => {
            if (value) rows.push([label, value]);
        });

        review.innerHTML = rows.map(([label, value]) => `<tr><td>${label}</td><td>${value}</td></tr>`).join('');
    }

    function submitForm() {
        saveCurrentData();
        const data = StepController.getData();
        const orderId = data.orderId || `NCM-${Math.floor(100000 + Math.random() * 900000)}`;
        const kdCode = data.kdCode || `NCM-KD-${Math.floor(100000 + Math.random() * 900000)}`;

        StepController.saveData({
            orderId,
            kdCode,
            statusStep: product.flowType === 'consult' ? 1 : 2,
            submittedAt: new Date().toISOString()
        });

        document.getElementById('order-id').textContent = orderId;
        document.getElementById('confirm-email').textContent = data.email || 'email đăng ký';
        document.getElementById('kd-code').textContent = kdCode;
        document.getElementById('success-overlay').style.display = 'flex';
    }

    function hydratePresetPackage() {
        const selected = StepController.getData().package;
        if (!selected) return;
        const input = Array.from(document.querySelectorAll('input[name="package"]')).find(item => item.value === selected);
        if (!input) return;
        document.querySelectorAll('.radio-card').forEach(card => card.classList.remove('selected'));
        input.checked = true;
        input.closest('.radio-card').classList.add('selected');
    }
});

function flowSummary(flowType) {
    const labels = {
        standard_form: 'Form 3 bước',
        standard_vneid: 'Form Ký VNeID 4 bước',
        standard_upload: 'Form + Upload 4 bước',
        remote_signing: 'Remote Signing 6 bước',
        consult: 'Tư vấn 2 bước',
        consult_schedule: 'Đặt lịch khảo sát 3 bước',
        consult_survey: 'Khảo sát nhu cầu 3 bước',
        course_register: 'Đăng ký khóa học 3 bước'
    };
    return labels[flowType] || labels.standard_form;
}

function buildStepHTML(stepId, product, extraFields) {
    switch (stepId) {
        case 'info': return buildInfoStep(extraFields, product);
        case 'legal': return buildLegalStep();
        case 'package': return buildPackageStep(product);
        case 'upload': return buildUploadStep(product);
        case 'review': return buildReviewStep();
        case 'payment': return buildPaymentStep();
        case 'confirm': return buildConfirmStep(product);
        case 'contract': return buildContractStep();
        case 'activate': return buildActivateStep();
        case 'system': return buildSystemStep();
        case 'survey': return buildSurveyStep(extraFields);
        case 'course': return buildCourseStep(extraFields);
        default: return `<p>Step: ${stepId}</p>`;
    }
}

function fg(name, label, type = 'text', required = false, validate = null, options = null) {
    const req = required ? '<span class="required">*</span>' : '';
    const reqAttr = required ? 'required' : '';
    const valAttr = validate ? `data-validate="${validate}"` : '';
    let input = '';

    if (type === 'textarea') {
        input = `<textarea class="form-control" name="${name}" rows="4" ${reqAttr} ${valAttr}></textarea>`;
    } else if (type === 'select' && options) {
        input = `<select class="form-control" name="${name}" ${reqAttr}><option value="">-- Chọn --</option>${options.map(option => `<option value="${option}">${option}</option>`).join('')}</select>`;
    } else {
        input = `<input type="${type}" class="form-control" name="${name}" ${reqAttr} ${valAttr}>`;
    }

    return `<div class="form-group"><label>${label} ${req}</label>${input}<div class="field-error"></div></div>`;
}

function buildInfoStep(extraFields, product) {
    let html = `<h2 class="step-title">① Thông tin đăng ký</h2>`;
    html += fg('customer_name', 'Tên doanh nghiệp / cá nhân', 'text', true, 'customer_name');
    html += `<div class="form-row">${fg('tax_id', 'Mã số thuế', 'text', true, 'tax_id')}${fg('contact_person', 'Người liên hệ', 'text', true, 'contact_person')}</div>`;
    html += `<div class="form-row">${fg('phone', 'Số điện thoại', 'tel', true, 'phone')}${fg('email', 'Email', 'email', true, 'email')}</div>`;
    html += fg('address', 'Địa chỉ liên hệ', 'text', true, 'address');

    if (extraFields.length > 0 && !['remote_signing', 'consult_schedule', 'consult_survey', 'course_register'].includes(product.flowType)) {
        html += `<div class="extra-section-title">Thông tin bổ sung cho ${product.shortName}</div>`;
        extraFields.forEach(field => { html += fg(field.name, field.label, field.type, field.required, field.validate || null, field.options); });
    }

    html += fg('notes', 'Ghi chú (nếu có)', 'textarea', false);
    return html;
}

function buildLegalStep() {
    let html = `<h2 class="step-title">② Thông tin người đại diện pháp luật</h2>`;
    html += fg('nguoi_ddpl', 'Họ tên người ĐDPL', 'text', true);
    html += `<div class="form-row">${fg('cccd', 'Số CCCD/CMND', 'text', true, 'cccd')}${fg('cccd_date', 'Ngày cấp', 'date', true, 'cccd_date')}</div>`;
    html += fg('cccd_place', 'Nơi cấp', 'text', true);
    return html;
}

function buildPackageStep(product) {
    let html = `<h2 class="step-title">Chọn gói đăng ký</h2><div class="radio-card-grid">`;
    product.packages.forEach((pkg, index) => {
        const popular = index === 1 && product.packages.length >= 3 ? ' popular' : '';
        const selected = index === 0 ? ' selected' : '';
        html += `
            <label class="radio-card${popular}${selected}">
                <input type="radio" name="package" value="${pkg.name}" ${index === 0 ? 'checked' : ''}>
                <div class="package-label">Gói cước</div>
                <div class="pkg-name">${pkg.name}</div>
                <div class="pkg-price">${pkg.price}</div>
                <p>Nhân viên kinh doanh sẽ xác nhận báo giá trước khi thu phí.</p>
            </label>`;
    });
    html += `</div>`;
    return html;
}

function buildUploadStep(product) {
    const docs = product.uploadDocs && product.uploadDocs.length ? product.uploadDocs : ['Hồ sơ pháp lý'];
    return `
        <h2 class="step-title">Tải lên hồ sơ pháp lý</h2>
        <p class="step-note">Chấp nhận JPG, PNG, PDF. Mỗi file tối đa 10MB. Trong demo, nhấn vào ô để mô phỏng đã tải file.</p>
        ${docs.map(doc => `
            <div class="upload-item">
                <label class="upload-label">${doc} <span class="required">*</span></label>
                <div class="upload-zone" data-doc="${doc}">
                    <div class="upload-icon">📁</div>
                    <p>Nhấp để chọn hoặc kéo thả file</p>
                    <div class="file-name"></div>
                </div>
            </div>
        `).join('')}
    `;
}

function buildReviewStep() {
    return `
        <h2 class="step-title">Xác nhận thông tin</h2>
        <p class="step-note">Vui lòng kiểm tra lại thông tin trước khi gửi hồ sơ sang bộ phận kinh doanh.</p>
        <table class="review-table" id="review-content"></table>
    `;
}

function buildPaymentStep() {
    return `
        <h2 class="step-title">Thanh toán</h2>
        <div class="payment-summary">
            <h4>Tổng thanh toán</h4>
            <p>Liên hệ báo giá</p>
            <span>Demo mô phỏng thanh toán. Kinh doanh sẽ xác nhận giá trước khi thu phí.</span>
        </div>
        <label class="payment-title">Phương thức thanh toán</label>
        <div class="payment-methods">
            ${paymentOption('bank', '🏦', 'Chuyển khoản ngân hàng', 'Xác nhận tự động qua VietQR', true)}
            ${paymentOption('qr', '📱', 'QR Code (VietQR)', 'Quét mã từ app ngân hàng')}
            ${paymentOption('wallet', '💳', 'Ví điện tử (MoMo / ZaloPay)', 'Thanh toán qua ví điện tử')}
            ${paymentOption('later', '📋', 'Thanh toán sau (theo hợp đồng)', 'Hoàn tất thu phí khi ký hợp đồng')}
        </div>
    `;
}

function paymentOption(value, icon, title, desc, selected = false) {
    return `
        <label class="payment-option${selected ? ' selected' : ''}">
            <input type="radio" name="payment_method" value="${value}" ${selected ? 'checked' : ''}>
            <span class="payment-icon">${icon}</span>
            <div><strong>${title}</strong><p>${desc}</p></div>
        </label>`;
}

function buildConfirmStep(product) {
    const title = product.flowType === 'consult_schedule' ? 'Xác nhận & đặt lịch khảo sát' : 'Xác nhận yêu cầu tư vấn';
    return `
        <h2 class="step-title">${title}</h2>
        <table class="review-table" id="review-content"></table>
        <div class="success-note">✓ Nhân viên Nacencomm sẽ liên hệ trong vòng 30 phút để tư vấn chi tiết.</div>
    `;
}

function buildContractStep() {
    return `
        <h2 class="step-title">Ký hợp đồng điện tử</h2>
        <div class="mock-panel">
            <div class="mock-icon">📝</div>
            <p>Hợp đồng mock đã được gửi qua email. Khách hàng có thể ký qua VNeID hoặc chữ ký số.</p>
        </div>
    `;
}

function buildActivateStep() {
    return `
        <h2 class="step-title">Kích hoạt dịch vụ</h2>
        <div class="mock-panel">
            <div class="mock-icon">🛡️</div>
            <p>Nhập mã kích hoạt 6 chữ số đã gửi qua SMS/Email.</p>
            <div class="pin-row">
                ${[1, 2, 3, 4, 5, 6].map(() => '<input type="text" maxlength="1" inputmode="numeric" class="pin-box">').join('')}
            </div>
        </div>
    `;
}

function buildSystemStep() {
    let html = `<h2 class="step-title">Mô tả hệ thống</h2>`;
    html += fg('mo_ta_he_thong', 'Mô tả hệ thống cần đánh giá', 'textarea', true);
    html += fg('quy_mo', 'Quy mô hệ thống', 'select', true, null, ['< 10 máy chủ', '10-50 máy chủ', '50-200 máy chủ', '> 200 máy chủ']);
    html += fg('ngay_khao_sat', 'Ngày khảo sát mong muốn', 'date', true);
    return html;
}

function buildSurveyStep(extraFields) {
    let html = `<h2 class="step-title">Khảo sát nhu cầu</h2>`;
    extraFields.forEach(field => { html += fg(field.name, field.label, field.type, field.required, field.validate || null, field.options); });
    return html;
}

function buildCourseStep(extraFields) {
    let html = `<h2 class="step-title">Chọn khóa học</h2>`;
    extraFields.forEach(field => { html += fg(field.name, field.label, field.type, field.required, field.validate || null, field.options); });
    return html;
}
