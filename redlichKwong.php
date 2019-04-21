<!-- redlichKwong.php -->
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Redlich Kwong</title>
        <link rel="stylesheet" href="css/master.css">
        <link rel="stylesheet" href="css/menu.css">
        <script src="lib/jquery-3.4.0.min.js" charset="utf-8"></script>
        <script src="js/RedlichKwong/queries.js" charset="utf-8"></script>
        <script src="js/RedlichKwong/interaction.js" charset="utf-8"></script>
    </head>
    <body>
        <?php
            include_once("menu.html");
        ?>
        <form id="entries" class="" action="" method="">
            <div class="group">
                <label for="primarySubstance">Primary substance: </label>
                <select id="primarySubstance" name="primary substance">
                    <option value="0">none</option>
                </select>
            </div>
            <div class="group">
                <label for="massPrimarySubstance">Mass primary substance (gr): </label>
                <input id="massPrimarySubstance" type="number" name="mass" step="any">
            </div>
            <div class="group">
                <label for="secondarySubstance">Secondary substance: </label>
                <select id="secondarySubstance" name="secondary substance">
                    <option value="0">none</option>
                </select>
            </div>
            <div class="group">
                <label for="massSecondarySubstance">Mass Secondary substance (gr): </label>
                <input id="massSecondarySubstance" type="number" name="mass" value="" step="any">
            </div>
            <div class="group">
                <label for="k12">Binary interaction coefficient - k_12: </label>
                <input id="k12" type="number" name="k12" step="any">
            </div>
            <div class="group">
                <p><label for=""><b>What do you want to calc?</b></label></p>
                <br>
                <input type="radio" name="variable" value="volumen" onclick="displayVariable('volumen');"> Volumen
                <input type="radio" name="variable" value="pressure" onclick="displayVariable('pressure');"> Pressure
                <input type="radio" name="variable" value="temperature" onclick="displayVariable('temperature');"> Temperature
            </div>
            <div class="group" id="volumen-group">
                <label for="volumen">Volumen (m3): </label>
                <input id="volumen" type="number" name="volumen" step="any">
            </div>
            <div class="group" id="pressure-group">
                <label for="pressure">Pressure (bar): </label>
                <input id="pressure" type="number" name="pressure" step="any">
            </div>
            <div class="group" id="temperature-group">
                <label for="temperature">Temperature (K): </label>
                <input id="temperature" type="number" name="temperature" step="any">
            </div>
            <div class="group">
                <button class="control" type="button" name="button" onclick="solve();">
                    Calculate
                </button>
                <button class="control" type="button" name="button" onclick="clear();">
                    Clear
                </button>
            </div>
        </form>
        <section id="result">

        </section>
    </body>
</html>
