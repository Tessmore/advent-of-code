package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

// Solution for the first star

// func main() {
// 	scanner := bufio.NewScanner(os.Stdin)
// 	r := regexp.MustCompile(`([LR])(\d{1,})`)

// 	dial := 50
// 	password := 0

// 	for scanner.Scan() {
// 		line := scanner.Text()

// 		match := r.FindStringSubmatch(line)
// 		direction := match[1]
// 		number, err := strconv.Atoi(match[2])

// 		if err != nil {
// 			fmt.Println("error:", err)
// 			continue
// 		}

// 		if direction == "L" {
// 			dial -= number
// 		} else {
// 			dial += number
// 		}

// 		dial = (dial + 100) % 100

// 		if dial == 0 {
// 			password += 1
// 		}
// 	}

// 	if err := scanner.Err(); err != nil {
// 		fmt.Fprintln(os.Stderr, "scan error:", err)
// 		os.Exit(1)
// 	}

// 	fmt.Println(password)
// }

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	r := regexp.MustCompile(`([LR])(\d{1,})`)

	dial := 50
	password := 0

	for scanner.Scan() {
		line := scanner.Text()

		match := r.FindStringSubmatch(line)
		direction := match[1]
		number, err := strconv.Atoi(match[2])

		if err != nil {
			fmt.Println("error:", err)
			continue
		}

		if direction == "L" {
			for i := 0; i < number; i++ {
				dial -= 1
				dial = (dial + 100) % 100

				if dial == 0 {
					password += 1
				}
			}
		} else {
			for i := 0; i < number; i++ {
				dial += 1
				dial = (dial + 100) % 100

				if dial == 0 {
					password += 1
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "scan error:", err)
		os.Exit(1)
	}

	fmt.Println(password)
}
