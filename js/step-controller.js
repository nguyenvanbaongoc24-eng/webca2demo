const StepController = {
    saveData: (data) => {
        const currentData = JSON.parse(sessionStorage.getItem('nacencomm_reg_data') || '{}');
        const newData = { ...currentData, ...data };
        sessionStorage.setItem('nacencomm_reg_data', JSON.stringify(newData));
    },
    
    getData: () => {
        return JSON.parse(sessionStorage.getItem('nacencomm_reg_data') || '{}');
    },
    
    clearData: () => {
        sessionStorage.removeItem('nacencomm_reg_data');
    },
    
    getCurrentProduct: () => {
        const data = StepController.getData();
        if (data.productSlug) {
            return PRODUCTS.find(p => p.slug === data.productSlug);
        }
        return null;
    }
};

if (typeof module !== 'undefined') {
    module.exports = StepController;
}
