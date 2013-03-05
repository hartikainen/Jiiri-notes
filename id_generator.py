import random, string

alphabet = string.lowercase + string.digits 

for loser in 'l1o0': # Choose to remove ones that might be visually confusing
	i = alphabet.index(loser)
	alphabet = alphabet[:i] + alphabet[i+1:]


def byte_to_base32_chr(byte):
	return alphabet[byte & 31]
	
def random_id(length):
	random_bytes = [random.randint(0, 0xFF) for i in range(length)]
	return ''.join(map(byte_to_base32_chr, random_bytes))