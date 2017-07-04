export const PENDING = []
export default {
  calculateDurationDiff (newDuration, oldDuration) {
    // calculate difference
    return Math.floor(parseInt(newDuration) - parseInt(oldDuration)) / (3600000 * 24)
  }
}
