#!/bin/bash

peopleNames=(
'David Turnbull'
'David Walsh'
)


if false
then
peopleNames=(

)

peopleNames=(
'Andrea Boschin'
'Adam Freeman'
'Andrew Church'
'Andrew Clear'
'Agus Kurniawan'
'Alessandro Del Sole'
'Bart De Smet'
'Bill Wagner'
'Brian Keller'
'Bob Tabor'
'Buddy James'
'Clint Rutkas'
'Cody Lindley'
'Cheryl Hammond'
'Chris Rose'
'Damian Edwards'
'Daren May'
'Dan Fernandez'
'Eric Ligman'
'Emanuele DelBono'
'Edward Charbeneau'
'Filip Wojcieszyn'
'Frederik Dietz'
'Gregor Suttie'
'Golnaz'
'John Papa'
'JeffKoch'
'Jon Galloway'
'Jerry Nixon'
'Jess Chadwick'
'John V Petersen'
'Jan Van der Haegen'
'Jesse Liberty'
'Jose M Aguilar'
'John Garland'
'James Tupper'
'Joe Booth'
'Kedar Kulkarni'
'Kraig Brockschmidt'
'Katherine Murray'
'Ken Haines'
'Lyle Luppes'
'Linda McCarthy'
'Matteo Pagani'
'Mike Taulty'
'Michael McLaughlin'
'Marc Clifton'
'Nandip Makwana'
'Pablo M Cibraro'
'Patrick Steele'
'Peter Bromberg'
'Patrice Pelland'
'Pascal Paré'
'Peter Shaw'
'Rachel Appel'
'Ryan Hodson'
'Robert Pickering'
'Robert Horvick'
'Scott Hanselman'
'Scott Guthrie'
'Steve Sanderson'
'Scott Allen'
'Steve Fenton'
'Stacia Misner'
'Steven Borg'
'Tim Heuer'
'Tim Elhajj'
'Pinal Bhatt'
'Jason Roberts'
'Xavier Morera'
'Nick Harrison'
'Ugo Lattanzi'
'Simone Chiaretta'
'Derek Jensen'
'Charles Zaiontz'
'Stephen Haunts'
'Marko Švaljek'
'Giancarlo Lelli'
'James Beresford'
'Ricardo Peres'
'Rui Machado'
'Kyle Burns'
'James McCaffrey'
'Fabio Franzini'
'Zoran Maksimovic'
'Eric Stitt'
'Jonas Gauffin'
'Dmitri Nesteruk'
'Ricardo Peres'
'Barton Poulson'
'Parikshit Savjani'
'Stacia Misner'
'Emanuele DelBono'
)
fi



for (( i = 0; i < ${#peopleNames[@]}; i++ ))
do
	person=${peopleNames[$i]}
	fileLink=$(echo $person|sed 's/ /-/g')
	echo $fileLink
    fileName=$(echo `date +%Y-%m-%d-`$person|sed 's/ /-/g')
    folderName=${person:0:1}

    if [ ! -d $folderName ]
    then
		mkdir -p -- "$folderName"
	fi

	cd $folderName
	cp ../people_template.html  ${fileName}.html
	sed -i '' "s/authorName/$person/g" ${fileName}.html
	sed -i '' "s/fileName/$fileLink/g" ${fileName}.html
	sed -i '' "s/dateItem/`date +%Y-%m-%d`/g" ${fileName}.html

	cd ..


done

#for item in "${peopleNames[@]}"
#do
	#echo Name: ${peopleNames[$index]}
	#echo $item
	#personName=$item
	#p=`date +%Y-%m-%d-`
	#fileName=$(echo $p$personName|sed 's/ /-/g')
	#folderName=${personName:0:1}
	#folderName=$folderName | tr '[:lower:]' '[:upper:]'

	#echo $personName  $fileName  $folderName
#
	##echo `date +%Y-%m-%d-`
	##echo $p
#
#
	#if [ -d $folderName ]
	#then
	#	echo $folderName Exists
	#else
	#	mkdir -p -- "$folderName"
	#fi
	#cd $folderName
	##echo $(PWD)/2015-06-02-${fileName}.html
	#cp ../people_template.html  ${fileName}.html
	#sed -i '' 's/authorName/${personName}/g' ${fileName}.html
	#cd ..

	#index=$index+1


#done



#cd E
#cp ../people_template.html  2015-06-02-Edward-Charbeneau.html

#sed -i '' 's/authorName/Edward Charbeneau/g' 2015-06-02-Edward-Charbeneau.html
#cp ../people_template.html  2015-06-02-Eric-Ligman.html
#cp ../people_template.html  2015-06-02-Emanuele-DelBono.html
#cd ..
#cd D
#cp ../people_template.html  2015-06-02-Damian-Edwards.html
#cp ../people_template.html  2015-06-02-Daren-May.html
#cp ../people_template.html  2015-06-02-Dan-Fernandez.html
#cd ..

#cd C
#cp ../people_template.html  2015-06-02-Clint-Rutkas.html
#cp ../people_template.html  2015-06-02-Cody-Lindley.html
#cp ../people_template.html  2015-06-02-Cheryl-Hammond.html
#cp ../people_template.html  2015-06-02-Chris-Rose.html
#cd ..

#cd B
#cp ../people_template.html  2015-06-02-Bart-De-Smet.html
#cp ../people_template.html  2015-06-02-Bill-Wagner.html
#cp ../people_template.html  2015-06-02-Brian-Keller.html
#cp ../people_template.html  2015-06-02-Bob-Tabor.html
#cp ../people_template.html  2015-06-02-Buddy-James.html
#cd ..

#cd A
#cp ../people_template.html  2015-06-02-Andrea-Boschin.html
#cp ../people_template.html  2015-06-02-Adam-Freeman.html
#cp ../people_template.html  2015-06-02-Andrew-Church.html
#cp ../people_template.html  2015-06-02-Andrew-Clear.html
#cp ../people_template.html  2015-06-02-Agus-Kurniawan.html
#cp ../people_template.html  2015-06-02-Alessandro-Del-Sole.html
#cd ..