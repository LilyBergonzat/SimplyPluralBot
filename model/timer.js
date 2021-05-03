/**
 * @param {int} milliseconds
 * @returns {Promise}
 */
global.sleep = async (milliseconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
};
