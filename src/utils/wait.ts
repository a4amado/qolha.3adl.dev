export default function wait(n: number): Promise<void> {
    return new Promise((res) => {
        setTimeout(() => res(), n);
    });
}
