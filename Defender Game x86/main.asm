;#show ["hola"] ascii
;dword[0x10000004],  ;is a flag for the sapceship which side to face up & down
;dword[0x10000008],  ;is a flag for the print of laser
;dword[0x10000020]   ;COL for the shooter
;dword[0x10000024]   ;store tail of the laser
;dword[0x10000028]   ;ROW for the shooter
;dword[0x10000032],  ;is a flag enemy
;dword[0x10000036],  ;is a flag enemy
;dword[0x10000040]   ;is a flag for the dirrection of the laser
;dword[0x10000044],  ;is a flag for impact delete laser
mov dword[0x10000048], 0xb800  ;is to show top bar
;dword[0x10000052]   ;store position of the score in the bar
mov dword[0x10000056], 0x8f308f20   ;store position of the score in the bar
;dword[0x10000060] ;counter of enemy appears
;enemy 1
;dword[0x10000032] ;activate enemy appears in screen
;dword[0x10000064] ;store enemy  position col 
;dword[0x10000068] ;store enemy  position row
;dword[0x10000072] ;store enemy position laser reset
;dword[0x10000076] ;is a flag to decide which side the enemy shoots
;dword[0x10000080] ;if ship is active
;dword[0x10000084] ;is a flag to know when the bullet end
;dword[0x10000088] ;is a flag to update which side after the bullet hits one of the limits
;enemy 2
;dword[0x10000092] ;activate enemy appears in screen
;dword[0x10000096] ;store enemy  position col
;dword[0x10000100] ;store enemy  position row
;dword[0x10000104] ;store enemy position laser reset
;dword[0x10000108] ;is a flag to decide which side the enemy shoots
;dword[0x10000112] ;if ship is active
;dword[0x10000116] ;is a flag to know when the bullet end
;dword[0x10000120] ;is a flag to update which side after the bullet hits one of the limits
;dword[0x10000124] just passing variable
;dword[0x10000128] just passing variable
;others
;dword[0x10000132] activate first time
;dword[0x10000134] lives
;dword[0x10000138] clear live in screen
;dword[0x10000142]de
;dword[0x10000146]fe
;dword[0x10000150]nd
;dword[0x10000154]er
;dword[0x10000158] change
;dword[0x10000162] store position clear
;dword[0x10000166] flag to clear spaceship
;dword[0x10000170] flag laser rgb
;dword[0x10000178] store rgb

start:
    push 10
    push 12
    call challenge
    add esp, 8
    #stop
 
; dword [ebp+ 8] => Row
; dword [ebp+12] => Colum
challenge:
    push ebp
    mov ebp, esp
    sub esp, 4
    mov dword [ebp-4], 0x0b020b01 ; spaceship
    call offset
   mov dword[0x10000000], esi
$loop:
    mov edx, dword[0x10000000]
    mov dword [edx], 0x0b200b20 ;paint clear
    cmp dword[esi], 0x0a080e07
    je $end_loop
    cmp dword[esi], 0x0C080907
    je $end_loop
    mov ebx, dword [ebp-4]
    mov dword [esi], ebx    ;paint 
    mov dword[0x10000162], esi 
    push 50
    call delay
    add esp, 4

$test_keys:

mov ah, byte [0xffff0004] ; Keypad
mov al, ah
$Top_ScreenBar:              ;show topbar menu
cmp dword[0x10000048], 47428 ;1 line 158
jge go4
mov esi, dword[0x10000048]
cmp dword[0x10000048], 47172
je banner
cmp dword[0x10000048], 47268
je bannerR
cmp dword[0x10000048], 47332
je banner2
cmp dword[0x10000048], 47400
je banner3
jmp continue_here
banner:
;dword[0x10000142]de
;dword[0x10000146]fe
;dword[0x10000150]nd
;dword[0x10000154]er
mov dword [esi], 0x8a458a44;de
mov dword[0x10000142], esi
add esi, 4;TESTING MODE TOP BAR
add dword[0x10000048], 4
mov dword [esi], 0x8a458a46;fe
mov dword[0x10000146], esi
add esi, 4
add dword[0x10000048], 4
mov dword [esi], 0x8a448a4e;nd
mov dword[0x10000150], esi
add esi, 4
add dword[0x10000048], 4
mov dword [esi], 0x8a528a45;er
mov dword[0x10000154], esi
add esi, 4
add dword[0x10000048], 4
jmp continue_here
bannerR:
mov dword [esi], 0x8b428b56;de
add esi, 4
add dword[0x10000048], 4
jmp continue_here
banner2:
mov dword[0x10000178], esi
mov dword [esi], 0x8f4F8f50;PO
add esi, 4
add dword[0x10000048], 4
mov dword [esi], 0x8f4E8f49;IN
add esi, 4
add dword[0x10000048], 4
mov dword [esi], 0x8f538f54;TS
add esi, 4
add dword[0x10000048], 4
mov dword [esi], 0x80208020;blank
add esi, 4
add dword[0x10000048], 4
mov edx, dword[0x10000056]
mov dword [esi], edx;points update
mov dword[0x10000052], esi
add esi, 4
add dword[0x10000048], 4
jmp continue_here
banner3:
mov dword [esi], 0x8b018d02;paint live 1
mov dword[0x10000138], esi
add esi, 4
add dword[0x10000048], 4
mov dword [esi], 0x8b208d20;blank
add esi, 4
add dword[0x10000048], 4
mov dword [esi], 0x8b018d02;live 2
add esi, 4
mov dword [esi], 0x8b208d20;blank
add esi, 4
add dword[0x10000048], 4
add dword[0x10000048], 4
mov dword [esi], 0x8b018d02;live 3
add esi, 4
add dword[0x10000048], 4
continue_here:
mov dword [esi], 0x80208020
add dword[0x10000048], 4
jmp $Top_ScreenBar
go4:

$RGB_Title:
;dword[0x10000142]de
;dword[0x10000146]fe
;dword[0x10000150]nd
;dword[0x10000154]er
;dword[0x10000158] change
cmp dword[0x10000158], 0
je rgb
mov ecx, dword[0x10000142]
mov dword[ecx], 0x8b458a44
mov ecx, dword[0x10000146]
mov dword[ecx], 0x8b458d46
mov ecx, dword[0x10000150]
mov dword[ecx], 0x8a448b4e
mov ecx, dword[0x10000154]
mov dword[ecx], 0x8d528b45
mov dword[0x10000158], 0

mov ecx, dword[0x10000178]
mov dword [ecx], 0x8b4F8a50;PO
add ecx, 4
add dword[0x10000048], 4
mov dword [ecx], 0x8b4E8d49;IN
add ecx, 4
add dword[0x10000048], 4
mov dword [ecx], 0x8d538b54;TS

jmp skip88
rgb:
mov ecx, dword[0x10000142]
mov dword[ecx], 0x8b458c44
mov ecx, dword[0x10000146]
mov dword[ecx], 0x8d458a46
mov ecx, dword[0x10000150]
mov dword[ecx], 0x8c448b4e
mov ecx, dword[0x10000154]
mov dword[ecx], 0x8a528d45
mov dword[0x10000158], 1

mov ecx, dword[0x10000178]
mov dword [ecx], 0x8b4F8c50;PO
add ecx, 4
add dword[0x10000048], 4
mov dword [ecx], 0x8d4E8a49;IN
add ecx, 4
add dword[0x10000048], 4
mov dword [ecx], 0x8c538d54;TS
skip88:

cmp dword[0x10000036], 20
jg go5
inc dword[0x10000036]
jmp continue3
go5:
cmp dword[0x10000060], 2 ;SET ENEMY SPACESHIPS
je continue3
cmp dword[0x10000060], 1
je $activate_enemy2
mov dword[0x10000036], 0 ;time / counter
mov dword[0x10000032], 1 ;activate enemy1 to show
jmp continue3
$activate_enemy2:
mov dword[0x10000036], 0 ;time / counter
mov dword[0x10000092], 1 ;activate enemy2 to show
continue3:
cmp dword[0x10000008], 0
je continue2
cmp dword[0x10000020], 78 ;limit right
jge end_laser
cmp dword[0x10000020], 0  ;limit left
jle end_laser
cmp dword[0x10000040], 1  ;change laser direction
je change_direction
add dword[0x10000020], 2
jmp continue5
change_direction:
sub dword[0x10000020], 2
continue5:
;#show dword[ebp + 8]
push dword[0x10000020] ;ROW
push dword[0x10000028] ;COL
call offset_projectile
add esp, 8 ;restore stack
mov dword[0x10000024], edi  ;store tail of the laser position
;#show dword[edi-2] hex     ;show laser 2 pos ahead reads
;#show dword[edi - 4] hex
cmp dword[edi-4], 0x0a080e07
je continue8
cmp dword[edi+4], 0x0a080e07
je continue8
cmp dword[edi+4], 0x0C080907 ; if object detected in front of the bullet
je continue8
cmp dword[edi-4], 0x0C080907 ; if object detected in front of the bullet
je continue8
mov dword [edi], 0x0d050d05 ; LASER PAINT
jmp go3
continue8:
mov ebx, dword[edi+4]
mov edx, dword[edi-4]
mov dword[0x10000008], 0
mov dword [edi], 0x0e010e09 ; EXPLOTION PAINT
push 80
call delay
add esp, 4
mov dword [edi+2], 0x0b200b20 ; clear
mov dword [edi+4], 0x0b200b20 ; clear
mov dword [edi-2], 0x0b200b20 ; clear
mov dword [edi-4], 0x0b200b20 ; clear
inc dword[0x10000044] ;counter enemies kill
cmp ebx, 0x0C080907
je same_path
cmp edx, 0x0C080907
je same_path
mov dword[0x10000112], 0 ;stop enemy lase fire green
mov dword[0x10000060], 1
jmp skip100
same_path:
mov dword[0x10000060], 0; - 1 enemy in enemy counter appears
mov dword[0x10000080], 0 ;stop enemy lase fire red
skip100:
$Score:
add dword[0x10000056], 65536
mov ecx, dword[0x10000052]
;#show dword[0x10000052]
mov ebx, dword[0x10000056]
mov dword[ecx], ebx
cmp dword[0x10000044], 5 ;win enemy
je $end_loop
go3:
push 80
call delay
add esp, 4
mov dword [edi], 0x0b200b20 ;clear laser
jmp continue2
end_laser:
mov dword[0x10000008], 0
continue2:
;EXT FINISH

$MOVEMENT_ENEMY1:
;ENEMY MOVEMENT
cmp dword[0x10000032], 0
je end_movement
cmp dword[0x10000004], 1  ;change laser direction
je change_enemy_direction
mov ebx, dword[ebp+12] ;col
add ebx, 35
cmp ebx, 83             ;dir to right side limit right
jl right_limit_reach
sub ebx, 55
right_limit_reach:
mov dword[0x10000064], ebx ;store enemy col enemy 1
mov dword[0x10000072], ebx ;store reset col enemy 1
push ebx ;col
mov ebx, dword [ebp+ 8]  ;row
add ebx, 5
cmp ebx, 30              ;dir to right side limit down
jl down_limit_reach
sub ebx, 13
down_limit_reach:
mov dword[0x10000068], ebx ;store enemy row enemy 1
push ebx ;row
call offset_projectile
add esp, 8
jmp continue6
change_enemy_direction:
;#show eax
add edi, 160 ;here demo
mov ebx, dword[ebp+12] ;col
sub ebx, 16 ;length of the enemy left
;#show ebx
;#show ebx
cmp ebx, 0             ;dir to left side limit left
jg left_limit_reach
add ebx, 42
left_limit_reach:
mov dword[0x10000064], ebx ;store enemy col enemy 1
mov dword[0x10000072], ebx ;store reset col enemy 1
push ebx ;col
mov ebx, dword [ebp+ 8]  ;row
sub ebx, 5 ;height of the enemy left
cmp ebx, 0              ;dir to left side limit down
jg up_limit_reach
add ebx, 19
up_limit_reach:
mov dword[0x10000068], ebx ;store enemy row enemy 1
push ebx ;row
call offset_projectile
add esp, 8
continue6:
mov dword [edi], 0x0C080907 ;   ENEMY PAINT
cmp dword[0x10000132], 0 ;activate first time
je activateC
mov dword[0x10000060], 2 ;counter enemies appears
jmp continue77
activateC:
mov dword[0x10000060], 1 ;counter enemies appears
inc dword[0x10000132]
continue77:
mov dword[0x10000080], 1 ;activate flag enemy appears 
mov dword[0x10000032], 0
end_movement:
;FINISH

$MOVEMENT_ENEMY2:
;ENEMY MOVEMENT
cmp dword[0x10000092], 0
je end_movement2
;#show dword[0x10000092]
cmp dword[0x10000004], 1  ;change laser direction
je change_enemy_direction2
mov ebx, dword[ebp+12] ;col
add ebx, 16
cmp ebx, 83             ;dir to right side limit right
jl right_limit_reach2
sub ebx, 55
right_limit_reach2:
mov dword[0x10000096], ebx ;store enemy col enemy 2
mov dword[0x10000104], ebx ;store reset col enemy 2
push ebx ;col
mov ebx, dword [ebp+ 8]  ;row
sub ebx, 2 
cmp ebx, 1
jg down_limit_reach2
add ebx, 3
cmp ebx, 30              ;dir to right side limit down
jl down_limit_reach2
sub ebx, 13
down_limit_reach2:
mov dword[0x10000100], ebx ;store enemy row enemy 2
push ebx ;row
call offset_projectile
add esp, 8
jmp continue62
change_enemy_direction2:
;#show eax
add edi, 160 ;here demo
mov ebx, dword[ebp+12] ;col
sub ebx, 16 ;length of the enemy left
;#show ebx
;#show ebx
cmp ebx, 0             ;dir to left side limit left
jg left_limit_reach2
add ebx, 42
left_limit_reach2:
mov dword[0x10000096], ebx ;store enemy col enemy 2
mov dword[0x10000104], ebx ;store reset col enemy 2
push ebx ;col
mov ebx, dword [ebp+ 8]  ;row
sub ebx, 5 ;height of the enemy left
;#show ebx
cmp ebx, 0              ;dir to left side limit down
jg up_limit_reach2
add ebx, 5
up_limit_reach2:
mov dword[0x10000100], ebx ;store enemy row enemy 2dword[0x10000158]
push ebx ;row
call offset_projectile
add esp, 8
continue62:
mov dword [edi], 0x0a080e07 ;   ENEMY PAINT
mov dword[0x10000060], 2 ;counter enemies appears
mov dword[0x10000112], 1 ;activate flag enemy appears 
mov dword[0x10000092], 0
end_movement2:
;FINISH

$Enemy2_laser:
cmp dword[0x10000096], 76 ;if laser reach limit right it reset enemy 1
jg reset_s2
cmp dword[0x10000096], 2  ;if laser reach limit left it reset enemy 1
jl reset_enemy2
cmp dword[0x10000112], 0 ;if ship is active#
je end_enemy2_laser

cmp dword[0x10000116], 0
je skip9
mov dword[0x10000116], 0
mov edx, dword [ebp+12]
mov dword[0x10000128], edx
;#show edx
skip9:
mov edx, dword[0x10000128] ;just passing variable
cmp dword[0x10000104], edx 
jg laser_to_the_left0
$laser_to_the_right0:
add dword[0x10000096], 2 ;change later
mov dword[0x10000170], 1
jmp continue120
laser_to_the_left0:
sub dword[0x10000096], 2
mov dword[0x10000170], 0
continue120:
push dword[0x10000096]
push dword[0x10000100]
call offset_projectile
add esp, 8

cmp dword[0x10000170], 0
je follow11
mov dword[edi], 0x0e050e05 ;enemy laser paint
jmp follow12
follow11:
mov dword[edi], 0x0a050a05 ;enemy laser paint
follow12:

cmp dword[0x10000134], 3
je $end_loop
cmp dword[edi+4],0x0b030b04
je $live
cmp dword[edi+4],0x0b020b01
je $live
cmp dword[edi-3], 0x0b020b01
je $live
cmp dword[edi-3], 0x0b030b04
je $live
jmp skip44
$live:
;#show eax
inc dword[0x10000134]
mov ecx, dword[0x10000138]
mov dword[ecx], 0x80208020
add dword[0x10000138], 8
mov dword[ebp+8], 4
mov dword[ebp+12], 67
skip44:  
push 20
call delay
add esp, 4
mov dword[edi], 0x0b200b20
jmp end_enemy2_laser
reset_enemy2:
reset_s2:
mov dword[0x10000116], 100
mov edx,dword[0x10000104]
mov dword[0x10000096], edx
end_enemy2_laser:

$Enemy_laser:
cmp dword[0x10000064], 76 ;if laser reach limit right it reset enemy 1
jg reset_s
;#show dword[0x10000064]
cmp dword[0x10000064], 2  ;if laser reach limit left it reset enemy 1
jl reset
cmp dword[0x10000080], 0 ;if ship is active#
je end_enemy_laser
cmp dword[0x10000084], 0
je skip
mov dword[0x10000084], 0
mov edx, dword [ebp+12]
mov dword[0x10000124], edx
skip:
mov edx, dword[0x10000124] ;just passing variable
cmp dword[0x10000072], edx 
jg laser_to_the_left
$laser_to_the_right:
;#show dword[0x10000064]
add dword[0x10000064], 2 ;change later
mov dword[0x10000174], 1
jmp continue12
laser_to_the_left:
sub dword[0x10000064], 2
mov dword[0x10000174], 0
continue12:
push dword[0x10000064]
push dword[0x10000068]
call offset_projectile
add esp, 8


cmp dword[0x10000174], 0
je follow13
mov dword[edi], 0x09050905 ;enemy laser paint
jmp follow14
follow13:
mov dword[edi], 0x0c050c05 ;enemy laser
follow14:

cmp dword[0x10000134], 3
je $end_loop
cmp dword[edi+3],0x0b030b04
je $live2
cmp dword[edi+3],0x0b020b01
je $live2
cmp dword[edi-3], 0x0b020b01
je $live2
cmp dword[edi-3], 0x0b030b04
je $live2
jmp skip442
$live2:
inc dword[0x10000134]
mov ecx, dword[0x10000138]
mov dword[ecx], 0x80208020
add dword[0x10000138], 8
mov dword[ebp+8], 25
mov dword[ebp+12], 25
skip442:
push 30
call delay
add esp, 4
mov dword[edi], 0x0b200b20
jmp end_enemy_laser
reset_s:
reset:
mov dword[0x10000084], 100
mov edx,dword[0x10000072]
mov dword[0x10000064], edx
end_enemy_laser:

$test_left:
    and al, 0x1
    test al, al
    jz $test_right
    cmp dword[0x10000166], 0
    jg follow1
    mov ecx, dword[0x10000162]
    mov dword [ecx], 0x0b200b20
    mov dword[0x10000166], 200
    follow1:
    mov dword[0x10000000], esi 
    mov eax, dword [ebp+12] 
    cmp eax, 1 ;limit spaceship left
    je here
    dec eax
    here:
    mov dword [ebp+12], eax 
    call offset
    mov dword [ebp-4], 0x0b030b04 ; spaceship left
    mov dword[0x10000004], 1 ;flag face
    mov dword[0x10000076], 0 ;flag enemy face laser
    jmp $loop
    
       
$test_right:
    mov al, ah
    and al, 0x2
    test al, al
    jz $test_down
    mov dword[0x10000000], esi
    mov eax, dword [ebp+12] 
    cmp eax, 79 ;limit spaceship to the right
    je here1
    inc eax
    here1:
    mov dword [ebp+12], eax 
    call offset
    mov dword [ebp-4], 0x0b020b01 ; spaceship right
    mov dword[0x10000004], 0 ;flag face active
    mov dword[0x10000076], 1 ;flag enemy face laser 
    jmp $loop
 
$test_down:
    mov al, ah
    and al, 0x4
    test al, al
    jz $test_up

    cmp dword[0x10000166], 0
    jg follow
    mov ecx, dword[0x10000162]
    mov dword [ecx], 0x0b200b20
    mov dword[0x10000166], 200
    follow:
    mov dword[0x10000000], esi
    mov eax, dword [ebp+8] 
    cmp eax, 29 ;limit spaceship down
    je here2
    inc eax
    here2:
    mov dword [ebp+8], eax 
    call offset
    ;Deciding which side will the spaceship face
    cmp dword[0x10000004], 1
    je opposite_face ; flag = 1 jmp to continue
    mov dword [ebp-4], 0x0b020b01 ; spaceship face right
    jmp continue
opposite_face:
    mov dword [ebp-4], 0x0b030b04 ; spaceship face left
continue:
    jmp $loop
 
$test_up:
    mov al, ah
    and al, 0x8
    test al, al
    jz $test_spacebar
    cmp dword[0x10000166], 0
    jg follow2
    mov ecx, dword[0x10000162]
    mov dword [ecx], 0x0b200b20
    mov dword[0x10000166], 200
    follow2:
    mov dword[0x10000000], esi
    mov eax, dword [ebp+8] 
    cmp eax, 2 ;limit spaceship up
    je here3
    dec eax
    here3:
    mov dword [ebp+8], eax 
    call offset
    ;Deciding which side will the spaceship face
    cmp dword[0x10000004], 1
    je opposite_face1 ; flag = 1 jmp to continue
    mov dword [ebp-4], 0x0b020b01 ; spaceship face right
    jmp continue1
opposite_face1:
    mov dword [ebp-4], 0x0b030b04 ; spaceship face left
continue1:
    jmp $loop
 
$test_spacebar:  ;SPACE
 mov al, ah
    and al, 128
    test al, al
    jz $test_q
    mov dword[0x10000000], esi
    ; dword [ebp+ 8] => Row
    ; dword [ebp+12] => Colum
    ;dword[0x10000020] COL
    ;dword[0x10000024] ROW
    ;dword[0x10000008] FLAG
    ;#show dword[ebp + 12]
    mov ebx, dword[ebp + 12]
    mov dword[0x10000020], ebx
    mov ebx, dword[ebp + 8]
    mov dword[0x10000028], ebx
    mov dword[0x10000008], 1
    mov ecx, dword[0x10000004]
    mov dword[0x10000040], ecx ;store laser dirrection 
    
stop_moving:
    jmp $loop

;WHEN PRESS Q
$test_q: 
    mov al, ah
    and al, 0x10
    test al, al
    jnz $end_loop
    jmp $test_keys
 
$end_loop:
    push 0x0    ;manda el parametro
    call clrscr
    add esp, 4 ;restauramos la pila
    ;#show al binary
    mov esp, ebp
    pop ebp
    ret
;--------------------------------------------------       
;FUNCTIONS DELAY
delay:
    mov edx, dword [0xffff0008]
    add edx, dword [esp + 4]
$delay_loop:
    cmp dword [0xffff0008], edx
    jl $delay_loop
ret
;------------------------------------------------
;FUNCTIONS OFFSET
offset:
mov esi, dword [ebp+8] ; Row
    mov ebx, esi
    shl esi, 6
    shl ebx, 4
    add esi, ebx
    add esi, dword [ebp+12] ; Col
    shl esi, 1
    add esi, 0xb800
ret
;--------------------------------------------------
;FUNCTIONS OFFSET_PROJECTILE
offset_projectile:
mov edi, dword [esp+4] ; Row
    mov ebx, edi
    shl edi, 6
    shl ebx, 4
    add edi, ebx
    add edi, dword [esp+8] ; Col
    shl edi, 1
    add edi, 0xb800
ret
;--------------------------------------------------
;FUNCTION PAINT ALL THE SCREEN
clrscr:
    mov ebx, dword[esp+4] 
    and ebx, 0x01 ;colores solo son 4 bits = es un filtro para verificar solo venga 2 bytes
    mov ecx, ebx
    shl ecx, 28 ;dword ecx va al inicio de los 32
    shl ebx, 12  ;word ecx va al incio de los 16 seria -> 12
    or ecx, ebx  ;se une ambos de 16 para hacer uno de 32
                 ;character ascci vacio
    or ecx, 0x80208020
    mov ebx, 0xb800
    mov edx, 0
$loop_s:
cmp dword[0x10000044], 5  ;win enemy
je show_win
cmp ebx, 49252
jl jumping
cmp ebx, 49252
jg jumping
mov dword[ebx], 0x84418447 ;GAME OVER SCREEN
add ebx, 4 ;me salto 4 bytes
mov dword[ebx], 0x8445844D
add ebx, 4 ;me salto 4 bytes
mov dword[ebx], 0x8456844F
add ebx, 4 ;me salto 4 bytes
mov dword[ebx], 0x84528445
add ebx, 4 ;me salto 4 bytes
jmp jumping2

show_win:      ;WINNER SCREEN
cmp ebx, 49252
jl jumping
cmp ebx, 49252
jg jumping
mov dword[ebx], 0x82498257
add ebx, 4 ;me salto 4 bytes
mov dword[ebx], 0x824E824E
add ebx, 4 ;me salto 4 bytes

mov dword[ebx], 0x82528245
add ebx, 4 ;me salto 4 bytes
jmp jumping2


jumping:
mov dword[ebx], ecx
add ebx, 4 ;me salto 4 bytes
jumping2:
inc edx
cmp ebx, 0xcac0 ;limite del vga

jl $loop_s
ret