<?php

// namespace app\helpers;

use app\widgets\TableJs\TableJs;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\helpers\VarDumper;

use function app\helpers\d;

$this->title = $station_name . ' shipyard';
// d($models[0]);
?>

<main class="flex-grow-1 bg-main-background d-flex flex-column justify-content-between sintony-reg">
    <div class='container-xxl'>
        <div class="row">
            <div class="col mb-3">
                <h1 class='mt-3 text-center fs-2 text-custom-orange sintony-bold'>
                    <?= Html::encode($this->title) ?>
                </h1>
                <div class="text-light row flex-column flex-md-row fs-7 justify-content-md-center row-gap-2">
                    <div class="max-w-f-content mx-auto mx-md-0">
                        <div class="d-flex flex-row flex-md-column gap-2 justify-content-md-center align-content-center 
                                    justify-content-lg-start">
                            <div class="small-tile text-light gx-0 rounded-3">
                                <a class="nav-button h-100 btn btn-violet border-0 text-light d-flex flex-column
                                        justify-content-center"
                                    href="<?= Url::to(["station/$id"]) ?>">
                                        station info
                                    </a>
                            </div>
                            <div class="small-tile text-light gx-0 rounded-3">
                                <a class="nav-button h-100 btn btn-violet border-0 text-light d-flex flex-column
                                        justify-content-center"
                                    href="<?= Url::toRoute(["station/market/$id"]) ?>">
                                        market
                                    </a>
                            </div>
                            <div class="small-tile text-light gx-0 rounded-3">
                                <a class="nav-button h-100 btn btn-violet border-0 text-light d-flex flex-column
                                        justify-content-center"
                                    href="<?= Url::toRoute(["station/ship-modules-hardpoint/$id"]) ?>">
                                        outfitting
                                    </a>
                            </div>
                            <div class="small-tile text-light gx-0 rounded-3">
                                <a class="nav-button h-100 btn btn-violet border-0 text-light d-flex flex-column
                                            justify-content-center active"
                                    href="<?= Url::toRoute(["station/ships/$id"]) ?>">
                                        ships
                                    </a>
                            </div>
                        </div>
                    </div>
                    <div class="bg-light rounded-2 px-2 bg-transparent text-center mx-auto mx-md-0
                                col col-sm-11 col-md-9 col-lg-8 col-xl-6">
                        <?php  echo TableJs::widget([
                            'container' => 'w-table',
                            'model' => $models,
                            'default_sorting' => 'asc',
                            'columns' => [
                                [
                                    'attribute' => 'name',
                                    'label' => 'Ship',
                                    'filterInputOptions' => [
                                        'class' => 'form-control',
                                    ]
                                ],
                                [
                                    'attribute' => 'price',
                                    'label' => 'Price',
                                    'textAfter' => ' Cr',
                                    'sort' => false
                                ],
                                [
                                    'attribute' => 'timestamp',
                                    'label' => 'Updated',
                                    'sort' => false
                                ],
                            ]]); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>