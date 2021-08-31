export const isSSREnabled = () => {
    return typeof window === "undefined"
}
