package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// // Day 2, star part 1

// func main() {
// 	scanner := bufio.NewScanner(os.Stdin)

// 	sum := 0

// 	for scanner.Scan() {
// 		line := scanner.Text()
// 		ranges := strings.Split(line, ",")

// 		for _, m := range ranges {
// 			minMax := strings.Split(m, "-")
// 			minInt, _ := strconv.Atoi(minMax[0])
// 			maxInt, _ := strconv.Atoi(minMax[1])

// 			for i := minInt; i <= maxInt; i++ {
// 				// As a string
// 				s := strconv.Itoa(i)

// 				// Check if we can make equal lengths
// 				mid := len(s) / 2
// 				left := s[:mid]
// 				right := s[mid:]

// 				if left == right {
// 					sum += i
// 				}

// 			}
// 		}
// 	}

// 	if err := scanner.Err(); err != nil {
// 		fmt.Fprintln(os.Stderr, "scan error:", err)
// 		os.Exit(1)
// 	}

// 	fmt.Println(sum)
// }

// Part 2

func allIdentical(parts []string) bool {
	if len(parts) == 0 {
		return false
	}
	first := parts[0]
	for _, p := range parts {
		if p != first {
			return false
		}
	}
	return true
}

// splitIntoParts divides a string into n parts (as evenly as possible).
func splitIntoParts(s string, n int) []string {
	length := len(s)
	if n <= 0 || n > length {
		return nil
	}
	if length%n != 0 {
		return nil // ignore uneven splits
	}

	parts := make([]string, 0, n)
	size := length / n
	start := 0

	for i := 0; i < n; i++ {
		end := start + size
		parts = append(parts, s[start:end])
		start = end
	}

	return parts
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	sum := 0

	for scanner.Scan() {
		line := scanner.Text()
		ranges := strings.Split(line, ",")

		for _, m := range ranges {
			minMax := strings.Split(m, "-")
			minInt, _ := strconv.Atoi(minMax[0])
			maxInt, _ := strconv.Atoi(minMax[1])

			for i := minInt; i <= maxInt; i++ {
				s := strconv.Itoa(i)

				// Try splitting into 2..len(s) parts
				for k := 2; k <= len(s); k++ {
					parts := splitIntoParts(s, k)

					if allIdentical(parts) {
						// fmt.Printf("%s split into %d parts: %v\n", s, k, parts)

						sum += i
						break
					}
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "scan error:", err)
		os.Exit(1)
	}

	fmt.Println(sum)
}
