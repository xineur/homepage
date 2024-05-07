/**
 * get dom
 * @param {*} name 
 * @returns 
 */
function $(name) {
  return document.querySelector(name);
}
/**
 * 
 * @param {*} time ms
 * @returns 
 */
function sleep(time) {
  return new Promise(res => {
    setTimeout(_ => res(), time)
  })
}